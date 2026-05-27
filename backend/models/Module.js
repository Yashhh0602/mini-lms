const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  order: { type: Number, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps: true })

module.exports = mongoose.model('Module', ModuleSchema)