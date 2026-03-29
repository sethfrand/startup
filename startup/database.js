const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('fiancesheet');


const userCollection = db.collection('user');
const expenseCollection = db.collection('expenses');
const sheetCollection = db.collection('sheet');


// Testing connection to database on startup, exit if fail
(async function testConnection() {
    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();



// --------------USER FUNCTIONS--------------
function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

// --------------EXPENSE FUNCTIONS--------------

async function addExpense(expense) {
    await expenseCollection.insertOne(expense);
}


async function getExpensesBySheetId(sheetId) {
    return expenseCollection.find({ sheetId: sheetId }).toArray();
}

async function updateExpense(expense) {
    await expenseCollection.updateOne({ _id: expense.id }, { $set: expense });
}

async function deleteExpense(id) {
    await expenseCollection.deleteOne({ _id: id });
}


// --------------SHEET FUNCTIONS--------------

async function getSheetsByUserId(userId) {
    return sheetCollection.find({ owner: userId }).toArray();

}

async function addSheet(sheet) {
    return sheetCollection.insertOne(sheet);
}

async function updateSheet(sheet) {
    await sheetCollection.updateOne({ _id: sheet.id }, { $set: sheet });
}

async function deleteSheet(id) {
    await sheetCollection.deleteOne({ _id: id });
}

async function shareSheet(sheetId, targetUserId) {
    await sheetCollection.updateOne({ _id: sheetId }, { $addToSet: { sharedWith: targetUserId } });
}

async function renameSheet(sheetId, newName) {
    await sheetCollection.updateOne({ _id: sheetId }, { $set: { name: newName } });
}
module.exports = { getUser,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth,
    addExpense,
    getExpensesBySheetId,
    getSheetsByUserId,
    addSheet};
