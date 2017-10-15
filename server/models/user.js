const { db, getNextSequence } = require('../db');

const get = async (id) => {
  // try {
  //   const result = await db().user.find({}).toArray()

  // }
  return new Promise((resolve, reject) => {
    db().user.find({}).toArray((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  });
}

const post = async (data, res) => {
  try {
    await db().user.insertOne({ _id: await getNextSequence('userid', res), ...data })
  } catch (err) {
    throw err
  }
}

module.exports = {
  get,
  post,
}