const Course = require('../models/Course')
const Module = require('../models/Module')

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'modules',
      options: { sort: { order: 1 } }
    })
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCourse }