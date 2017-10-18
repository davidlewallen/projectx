const { db, Mongo } = require('../db');

const getUsers = async (id) => {
  const query = id ? { _id: Mongo.ObjectID(id) } : {};

  try {
    return await db().user.find(query).toArray();
  } catch(err) {
    console.log(err);
    throw err;
  }
}

const postUser = async (data) => {
  const modData = {...data, created: Date.now()};

  try {
    const result = await db().user.insertOne(modData);
    
    return result.ops[0];
  } catch (err) {
    console.log(err);
    throw err
  }
}

const updateUser = async (id, data) => {
  const args = [
    { _id: Mongo.ObjectID(id) },
    { _id: 1},
    { $set: { ...data } },
    { new: true },
  ]

  try {
    const result = await db().user.findAndModify(...args);
    return result.value
  } catch(err) {
    console.log(err);
    throw err
  };
}

const deleteUser = async (id) => {
  try {
    await db().user.deleteOne({ _id: Mongo.ObjectID(id) });
  } catch(err) {
    console.log(err);
    throw err;
  };
}

module.exports = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
}