import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const CourseContext = createContext()

const COURSE_ID = '6a173f43670d25afb4772447'
const USER_ID = 'user123'
const API = 'https://mini-lms-backend-67ek.onrender.com/api'

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState([])
  const [activeModule, setActiveModule] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, progressRes] = await Promise.all([
          axios.get(`${API}/courses/${COURSE_ID}`),
          axios.get(`${API}/progress/${USER_ID}/${COURSE_ID}`)
        ])
        setCourse(courseRes.data)
        setProgress(progressRes.data)
        setActiveModule(courseRes.data.modules[0])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const isCompleted = (moduleId) => 
    progress.some(p => p.moduleId === moduleId && p.completed)

  const markComplete = async (moduleId) => {
    // Optimistic update
    setProgress(prev => {
      const exists = prev.find(p => p.moduleId === moduleId)
      if (exists) return prev.map(p => p.moduleId === moduleId ? { ...p, completed: true } : p)
      return [...prev, { moduleId, completed: true }]
    })

    try {
      await axios.put(`${API}/progress/${USER_ID}/${moduleId}`, {
        completed: true,
        courseId: COURSE_ID
      })
    } catch (err) {
      // Revert on failure
      setProgress(prev => prev.map(p => 
        p.moduleId === moduleId ? { ...p, completed: false } : p
      ))
    }
  }

  const completedCount = course?.modules.filter(m => isCompleted(m._id)).length || 0
  const totalCount = course?.modules.length || 0

  return (
    <CourseContext.Provider value={{
      course, activeModule, setActiveModule,
      isCompleted, markComplete,
      completedCount, totalCount, loading
    }}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = () => useContext(CourseContext)