const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  User.getUsers()
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send('ERROR: Could not get users')
    });
})

router.get('/:id', (req, res) => {
  User.getUsers(req.params.id)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`ERROR: Could not get user with id: ${req.params.id}`)
    });
})

router.post('/', (req, res) => {
  User.post(req.body)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send('ERROR: Could not post user');
    });
})

router.put('/:id', (req, res) => {
  User.updateUser(req.params.id, req.body)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`ERROR: Could not update user with id: ${req.params.id}`);
    });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  User.deleteUser(id)
    .then(() => res.send(`Deleted user with id: ${id}`))
    .catch(err => {
      console.log(err);
      res.status(500).send(`ERROR: Could not delete user with id: ${id}`)
    })
})

module.exports = router;
