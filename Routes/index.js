const express = require('express');
const router = express.Router();

router.use('/user', require('./User'));
router.use('/book', require('./Book'));

module.exports = router;
