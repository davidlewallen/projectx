const express = require('express');
const router = express.Router(); // eslint-disable-line

router.use('/users', require('./users'));

module.exports = router;
