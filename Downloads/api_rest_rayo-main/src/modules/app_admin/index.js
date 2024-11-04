const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const travelRorutes = require('./travels')

router.use('/users', userRoutes);
router.use('/travels', travelRorutes)

module.exports = router;