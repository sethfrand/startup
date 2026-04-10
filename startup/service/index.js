const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
require('dotenv').config();
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Logger
app.use((req, res, next) => {
    console.log('REQUEST:', req.method, req.path);
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// ── AUTH ──────────────────────────────────────────────────────────────────────

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    const existing = await DB.getUser(req.body.email);
    if (existing) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const token = uuid.v4();
        await DB.createUser(req.body.email, passwordHash, token);
        setAuthCookie(res, token);
        res.send({ email: req.body.email });
    }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        await DB.updateUser(user);
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);
    if (user) {
        await DB.removeAuthToken(user.email);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Verify auth middleware
const verifyAuth = async (req, res, next) => {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


// ── SHEETS ────────────────────────────────────────────────────────────────────

// Get all sheets for logged-in user
apiRouter.get('/sheets', verifyAuth, async (req, res) => {
    const sheets = await DB.getSheets(req.user.email);
    res.send(sheets.map(s => ({ id: s._id.toString(), name: s.name, owner: s.owner })));
});

// Create sheet
apiRouter.post('/sheets', verifyAuth, async (req, res) => {
    const sheet = await DB.createSheet(req.body.name, req.user.email);
    res.send(sheet); // createSheet already returns normalized {id, name, owner}
});

// Delete sheet
apiRouter.delete('/sheets/:id', verifyAuth, async (req, res) => {
    await DB.deleteSheet(req.params.id, req.user.email);
    res.status(204).end();
});

// Rename sheet
apiRouter.post('/sheets/:id/rename', verifyAuth, async (req, res) => {
    await DB.renameSheet(req.params.id, req.body.name, req.user.email);
    res.send({ msg: 'Renamed' });
});

// Share sheet
apiRouter.post('/sheets/:id/share', verifyAuth, async (req, res) => {
    const targetUser = await DB.getUser(req.body.targetEmail);
    if (!targetUser) {
        return res.status(404).send({ msg: 'User not found' });
    }
    await DB.shareSheet(req.params.id, req.user.email, req.body.targetEmail);
    res.send({ msg: 'Shared' });
});


// ── EXPENSES ──────────────────────────────────────────────────────────────────

// Get expenses for a sheet
apiRouter.get('/expenses', verifyAuth, async (req, res) => {
    const expenses = await DB.getExpenses(req.query.sheetId);
    res.send(expenses); // getExpenses already returns normalized docs
});

// Create expense
apiRouter.post('/expenses', verifyAuth, async (req, res) => {
    const expense = await DB.createExpense({
        date: req.body.date,
        description: req.body.description,
        amount: Number(req.body.amount),
        category: req.body.category,
        sheetId: req.body.sheetId,
    });
    res.send(expense); // createExpense already returns normalized doc
});

// Update expense
apiRouter.post('/expenses/:id/update', verifyAuth, async (req, res) => {
    const updated = await DB.updateExpense(req.params.id, req.body);
    if (!updated) return res.status(404).send({ msg: 'Expense not found' });
    res.send(updated);
});


// ── EXCHANGE RATE ─────────────────────────────────────────────────────────────

apiRouter.get('/exchange-rate', async (req, res) => {
    const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=USD,GBP,EUR,PLN`
    );
    const data = await response.json();
    res.send(data);
});


// ── ERROR HANDLING / FALLBACK ─────────────────────────────────────────────────

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);