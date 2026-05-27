const express = require('express')
const router = express.Router()
const { getCourse } = require('../controllers/courseController')

router.get('/:id', getCourse)

module.exports = router