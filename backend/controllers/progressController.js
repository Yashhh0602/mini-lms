const UserProgress = require('../models/UserProgress')

const getProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({
      userId: req.params.userId,
      courseId: req.params.courseId
    })
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProgress = async (req, res) => {
  try {
    const { userId, moduleId } = req.params
    const { completed, watchedTimestamp } = req.body

    const progress = await UserProgress.findOneAndUpdate(
      { userId, moduleId },
      { completed, watchedTimestamp },
      { upsert: true, new: true }
    )
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProgress, updateProgress }