const mongoose = require('mongoose')

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  completed: { type: Boolean, default: false },
  watchedTimestamp: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('UserProgress', UserProgressSchema)