import { useRef, useEffect } from 'react'
import { useCourse } from '../context/CourseContext'
import axios from 'axios'

const USER_ID = 'user123'
const API = 'http://localhost:5000/api'
const COURSE_ID = '6a173f43670d25afb4772447'

const VideoPlayer = () => {
  const { activeModule, markComplete, isCompleted, course, setActiveModule } = useCourse()
  const videoRef = useRef(null)

  // Resume from last watched timestamp
  useEffect(() => {
    if (!activeModule || !videoRef.current) return
    const fetchTimestamp = async () => {
      try {
        const res = await axios.get(`${API}/progress/${USER_ID}/${COURSE_ID}`)
        const moduleProgress = res.data.find(p => p.moduleId === activeModule._id)
        if (moduleProgress?.watchedTimestamp) {
          videoRef.current.currentTime = moduleProgress.watchedTimestamp
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchTimestamp()
  }, [activeModule])

  // Save timestamp on pause
  const handlePause = async () => {
    if (!activeModule || !videoRef.current) return
    try {
      await axios.put(`${API}/progress/${USER_ID}/${activeModule._id}`, {
        completed: isCompleted(activeModule._id),
        watchedTimestamp: videoRef.current.currentTime,
        courseId: COURSE_ID
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Auto advance on video end
  const handleVideoEnd = () => {
    if (!isCompleted(activeModule._id)) {
      markComplete(activeModule._id)
    }
    const currentIndex = course.modules.findIndex(m => m._id === activeModule._id)
    const nextModule = course.modules[currentIndex + 1]
    if (nextModule) setActiveModule(nextModule)
  }

  if (!activeModule) return null

  return (
    <div style={{ flex: 1, padding: 24, background: '#0f0f1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: 16 }}>{activeModule.title}</h1>
      <video
        ref={videoRef}
        src={activeModule.videoUrl}
        controls
        onPause={handlePause}
        onEnded={handleVideoEnd}
        style={{ width: '100%', borderRadius: 12, background: '#000', maxHeight: 480 }}
      />
      <p style={{ color: '#aaa', margin: '16px 0' }}>{activeModule.description}</p>
      <button
        onClick={() => markComplete(activeModule._id)}
        disabled={isCompleted(activeModule._id)}
        style={{
          padding: '10px 24px',
          background: isCompleted(activeModule._id) ? '#333' : '#6c63ff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: isCompleted(activeModule._id) ? 'not-allowed' : 'pointer',
          fontSize: 15
        }}
      >
        {isCompleted(activeModule._id) ? '✅ Completed' : 'Mark as Complete'}
      </button>
    </div>
  )
}

export default VideoPlayer