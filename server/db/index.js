const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const config = JSON.parse(fs.readFileSync('./.config', { encoding: 'utf8' }));
const username = encodeURIComponent(config.mongodb.username);
const password = encodeURIComponent(config.mongodb.password);

const uri = `mongodb://${username}:${password}@ds113785.mlab.com:13785/gift-registry`;

let _db

const connectDB = (callback) => {
  MongoClient.connect(uri, (err, db) => {
    const userCollection = db.collection('users');
    const counterCollection = db.collection('counters');

    _db = {
      raw: db,
      user: userCollection,
      counters: counterCollection,
    };
    return callback(err)
  })
}

const db = () => {
  return _db;
}

const getNextSequence = async (name, res) => {
  try {
    const query = [
      { _id: name },
      { _id: 1 },
      { $inc: { seq: 1 } },
      { new: true }
    ];

    const result = await db().counters.findAndModify(...query);
    return result.value.seq;
  } catch(err) {
    console.log('gnsError:', err);
    throw err;
  }
}

const disconnectDB = () => _db.close()

module.exports = { connectDB, db, getNextSequence, disconnectDB }
