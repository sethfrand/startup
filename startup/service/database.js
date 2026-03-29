const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('financeSheet');

const userCollection     = db.collection('users');
const sheetCollection    = db.collection('sheets');
const expenseCollection  = db.collection('expenses');

// Testing connection to database on startup, exit if fail
(async function testConnection() {
    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
})();


// ── USER FUNCTIONS ────────────────────────────────────────────────────────────

async function getUser(email) {
    return userCollection.findOne({ email });
}

async function getUserByToken(token) {
    return userCollection.findOne({ token });
}

async function createUser(email, passwordHash, token) {
    const user = { email, password: passwordHash, token };
    await userCollection.insertOne(user);
    return user;
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: { token: user.token } });
}

async function removeAuthToken(email) {
    await userCollection.updateOne({ email }, { $unset: { token: '' } });
}


// ── SHEET FUNCTIONS ───────────────────────────────────────────────────────────

async function getSheets(userEmail) {
    return sheetCollection
        .find({ $or: [{ owner: userEmail }, { sharedWith: userEmail }] })
        .toArray();
}

async function createSheet(name, owner) {
    const sheet = { name, owner, sharedWith: [], createdAt: new Date() };
    const result = await sheetCollection.insertOne(sheet);
    return { id: result.insertedId.toString(), name, owner };
}

async function renameSheet(sheetId, newName, userEmail) {
    await sheetCollection.updateOne(
        { _id: new ObjectId(sheetId), owner: userEmail },
        { $set: { name: newName } }
    );
}

async function deleteSheet(sheetId, userEmail) {
    const result = await sheetCollection.deleteOne({
        _id: new ObjectId(sheetId),
        owner: userEmail,
    });
    // Also delete all expenses belonging to this sheet
    if (result.deletedCount > 0) {
        await expenseCollection.deleteMany({ sheetId });
    }
}

async function shareSheet(sheetId, ownerEmail, targetEmail) {
    await sheetCollection.updateOne(
        { _id: new ObjectId(sheetId), owner: ownerEmail },
        { $addToSet: { sharedWith: targetEmail } }  // $addToSet prevents duplicates
    );
}


// ── EXPENSE FUNCTIONS ─────────────────────────────────────────────────────────

async function getExpenses(sheetId) {
    const docs = await expenseCollection
        .find({ sheetId })
        .sort({ createdAt: -1 })
        .toArray();
    return docs.map(normalizeId);
}

async function createExpense({ date, description, amount, category, sheetId }) {
    const expense = {
        date,
        description,
        amount: Number(amount),
        category,
        sheetId,
        createdAt: new Date(),
    };
    const result = await expenseCollection.insertOne(expense);
    return normalizeId({ ...expense, _id: result.insertedId });
}

async function updateExpense(expenseId, fields) {
    // Strip fields that should never be overwritten
    const { _id, sheetId, createdAt, ...safeFields } = fields;
    if (safeFields.amount !== undefined) safeFields.amount = Number(safeFields.amount);

    const result = await expenseCollection.findOneAndUpdate(
        { _id: new ObjectId(expenseId) },
        { $set: safeFields },
        { returnDocument: 'after' }
    );
    return result ? normalizeId(result) : null;
}

async function deleteExpense(expenseId) {
    await expenseCollection.deleteOne({ _id: new ObjectId(expenseId) });
}


// ── HELPERS ───────────────────────────────────────────────────────────────────

// Converts MongoDB _id to plain string id so the frontend never sees ObjectId
function normalizeId(doc) {
    if (!doc) return doc;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
}


module.exports = {
    // users
    getUser,
    getUserByToken,
    createUser,
    updateUser,
    removeAuthToken,
    // sheets
    getSheets,
    createSheet,
    renameSheet,
    deleteSheet,
    shareSheet,
    // expenses
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
};