const express = require('express');
const router = express.Router();
const Joi = require('joi');

const User = require('../models/user');

router.get('/', (req, res) => {
  User.getUsers()
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send('ERROR: Could not get users')
    });
})

router.get('/:id', async (req, res) => {
  try {
    const result = await User.getUsers(req.params.id)
    res.json(result);
  } catch(err) {
    console.log(err);
    res.status(500).send(`ERROR: Could not get user with id: ${req.params.id}`)
  }
})

router.post('/', (req, res) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  });

  const validateRequest = Joi.validate(req.body, schema, { abortEarly: false });

  if (validateRequest.error) {
    return res.status(400).send(validateRequest.error.toString());
  }

  User.postUser(req.body)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send('ERROR: Could not post user');
    });
})

router.put('/:id', (req, res) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(2).max(30),
    lastName: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  });

  const validateRequest = Joi.validate(req.body, schema, { abortEarly: false });

  if (validateRequest.error) {
    return res.status(400).send(validateRequest.error.toString());
  }

  User.updateUser(req.params.id, req.body)
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`ERROR: Could not update user with id: ${req.params.id}`);
    });
})

router.delete('/:id', (req, res) => {
  User.deleteUser(req.params.id)
    .then(() => res.send(`Deleted user with id: ${req.params.id}`))
    .catch(err => {
      console.log(err);
      res.status(500).send(`ERROR: Could not delete user with id: ${req.params.id}`)
    })
})

module.exports = router;
