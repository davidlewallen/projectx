const express = require('express');
const router = express.Router();

const Users = require('../models/user');

router.get('/', (req, res) => {
  Users.get().then(x => {
    res.send(x);
  });
})

router.post('/', async (req, res) => {
  try {
    await Users.post(req.body, res)
    res.send('successfully inserted user');
  } catch(err) {
    console.log('err', err);
    res.status(500).send('broke');
  }
})

router.get('/1', (req, res) => {
  Users.getSeq();
  res.send('test');
})

module.exports = router;
