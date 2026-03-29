const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('financeSheet');

// Collections
const userCollection       = db.collection('users');
const sheetCollection      = db.collection('sheets');
const expenseCollection    = db.collection('expenses');

(async function connect() {
    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
})();

// ── Auth ──────────────────────────────────────────────────────────────────────

async function getUser(email) {
    return userCollection.findOne({ email });
}

async function getUserByToken(token) {
    return userCollection.findOne({ token });
}

async function createUser(email, passwordHash, token) {
    const user = { email, passwordHash, token };
    await userCollection.insertOne(user);
    return user;
}

async function updateUserToken(email, token) {
    await userCollection.updateOne({ email }, { $set: { token } });
}

// ── Sheets ────────────────────────────────────────────────────────────────────

async function getSheets(userEmail) {
    // Return sheets owned by or shared with this user
    return sheetCollection
        .find({ $or: [{ owner: userEmail }, { sharedWith: userEmail }] })
        .toArray();
}

async function createSheet(name, owner) {
    const sheet = {
        name,
        owner,
        sharedWith: [],
        createdAt: new Date(),
    };
    const result = await sheetCollection.insertOne(sheet);
    return { ...sheet, id: result.insertedId.toString() };
}

async function renameSheet(sheetId, newName, userEmail) {
    const { ObjectId } = require('mongodb');
    const result = await sheetCollection.updateOne(
        { _id: new ObjectId(sheetId), owner: userEmail },
        { $set: { name: newName } }
    );
    return result.modifiedCount > 0;
}

async function deleteSheet(sheetId, userEmail) {
    const { ObjectId } = require('mongodb');
    const result = await sheetCollection.deleteOne({
        _id: new ObjectId(sheetId),
        owner: userEmail,
    });
    // Also remove all expenses for that sheet
    if (result.deletedCount > 0) {
        await expenseCollection.deleteMany({ sheetId });
    }
    return result.deletedCount > 0;
}

async function shareSheet(sheetId, ownerEmail, targetEmail) {
    const { ObjectId } = require('mongodb');
    const result = await sheetCollection.updateOne(
        { _id: new ObjectId(sheetId), owner: ownerEmail },
        { $addToSet: { sharedWith: targetEmail } }
    );
    return result.modifiedCount > 0;
}

// ── Expenses ──────────────────────────────────────────────────────────────────

async function getExpenses(sheetId) {
    return expenseCollection
        .find({ sheetId })
        .sort({ createdAt: -1 })
        .toArray()
        .then(docs => docs.map(normalizeId));
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
    const { ObjectId } = require('mongodb');
    // Prevent overwriting protected fields
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
    const { ObjectId } = require('mongodb');
    const result = await expenseCollection.deleteOne({ _id: new ObjectId(expenseId) });
    return result.deletedCount > 0;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Convert MongoDB _id to plain string `id` so the frontend never sees ObjectId
function normalizeId(doc) {
    if (!doc) return doc;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
}

module.exports = {
    // auth
    getUser,
    getUserByToken,
    createUser,
    updateUserToken,
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