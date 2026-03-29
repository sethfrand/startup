const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const {response} = require("express");
const app = express();
const DB = require('./database.js');

require('dotenv').config();

const authCookieName = 'token';


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Logger - must be FIRST so all requests are logged
app.use((req, res, next) => {
    console.log('REQUEST:', req.method, req.path);
    next();
});

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// ---------- AUTHENTICATION  ----------


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {

    const existing = await DB.getUser(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        await DB.updateUserToken(user)
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }else{
        res.status(401).send({ msg: 'Unauthorized' });
    }

});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user)
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
        }
    }else{
    res.status(401).send({ msg: 'Unauthorized' });
    }

});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await DB.getUserByToken('token', req.cookies[authCookieName]);
    if (user) {
        await DB.removeUserToken(token);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    console.log('cookies:', req.cookies);
    console.log('auth cookie:', req.cookies[authCookieName]);
    const user = await DB.getUserByToken('token', req.cookies[authCookieName]);
    console.log('user found:', user);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


//-----------------------SHEETS

// Get all sheets for logged-in user
apiRouter.get('/sheets', verifyAuth, async (req, res) => {
    const sheets = await DB.getSheetsByUserId(req.user.email);
    // Normalize _id to id for the frontend
    res.send(sheets.map(s => ({ id: s._id.toString(), name: s.name, owner: s.owner })));
});

// Delete sheet
apiRouter.delete('/sheets/:id', verifyAuth, async (req, res) => {
    await DB.deleteSheet(req.params.id);
    res.status(204).end();
});

// Rename sheet
apiRouter.post('/sheets/:id/rename', verifyAuth, async (req, res) => {
    await DB.renameSheet(req.params.id, req.body.name);
    res.send({ msg: 'Renamed' });
});

// Share sheet
apiRouter.post('/sheets/:id/share', verifyAuth, async (req, res) => {
    const targetUser = await DB.getUser(req.body.targetEmail);
    if (!targetUser) {
        return res.status(404).send({ msg: 'User not found' });
    }
    await DB.shareSheet(req.params.id, req.body.targetEmail);
    res.send({ msg: 'Shared' });
});


// EXPENSES

apiRouter.get('/expenses', verifyAuth, (req, res) => {
    const storedExpenses = expenses.filter(e => e.sheetId === Number(req.query.sheetId));
    res.send(storedExpenses);
    console.log('query sheetId:', req.query.sheetId, typeof req.query.sheetId);
    console.log('stored sheetIds:', expenses.map(e => ({id: e.sheetId, type: typeof e.sheetId})));
});

apiRouter.post('/expenses', verifyAuth, (req, res) => {
    const newExpense = { ...req.body, expense: req.user.email, id: Date.now()};
    expenses.push(newExpense);
    res.send(newExpense);
});

apiRouter.post('/expenses/:id/update', verifyAuth, (req, res) => {
    const expenseToUpdate = expenses.find(e => e.id === Number(req.params.id));
    if (expenseToUpdate) {
        Object.assign(expenseToUpdate, req.body);
        res.send(expenseToUpdate);
    } else {
        res.status(404).send({ msg: 'Expense not found' });
    }
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
    });
}


//API FOR CURRENCY EXCHANGE
apiRouter.get('/exchange-rate', async (req, res) => {
    const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=USD,GBP,EUR,PLN`
    );
    const data = await response.json();
    console.log('fixer response:', data);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});