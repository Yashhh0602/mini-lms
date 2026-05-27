require('dotenv').config()
const mongoose = require('mongoose')
const Course = require('./models/Course')
const Module = require('./models/Module')

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected, seeding...')

  await Course.deleteMany()
  await Module.deleteMany()

  const modules = await Module.insertMany([
  { title: 'Introduction to JavaScript', description: 'Basics of JS', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', order: 1 },
  { title: 'Variables & Data Types', description: 'var, let, const and types', videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', order: 2 },
  { title: 'Functions & Scope', description: 'Function declarations and scope', videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', order: 3 },
  { title: 'Promises & Async/Await', description: 'Asynchronous JavaScript', videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', order: 4 },
  { title: 'DOM Manipulation', description: 'Interacting with the browser', videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', order: 5 },
])
  await Course.create({
    title: 'Advanced JavaScript',
    description: 'A complete guide to modern JavaScript',
    modules: modules.map(m => m._id)
  })

  console.log('Database seeded!')
  process.exit()
}

seed()