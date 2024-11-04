const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const travelRoutes = require('./travels')

router.use('/users', userRoutes);
router.use('/travels', travelRoutes)

module.exports = router;
