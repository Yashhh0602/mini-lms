import { CourseProvider, useCourse } from './context/CourseContext'
import CourseSidebar from './components/CourseSidebar'
import VideoPlayer from './components/VideoPlayer'
import ProgressBar from './components/ProgressBar'

const AppContent = () => {
  const { loading } = useCourse()

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '100vh',
      background: '#0f0f1a', color: '#fff', fontSize: 18
    }}>
      Loading course...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ProgressBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <CourseSidebar />
        <VideoPlayer />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  )
}

export default App