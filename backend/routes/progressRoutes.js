const express = require('express')
const router = express.Router()
const { getProgress, updateProgress } = require('../controllers/progressController')

router.get('/:userId/:courseId', getProgress)
router.put('/:userId/:moduleId', updateProgress)

module.exports = router