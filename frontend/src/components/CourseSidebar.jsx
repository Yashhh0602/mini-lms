import { useCourse } from '../context/CourseContext'

const CourseSidebar = () => {
  const { course, activeModule, setActiveModule, isCompleted } = useCourse()

  return (
    <div style={{
      width: 280, minHeight: '100vh',
      background: '#13131f', borderRight: '1px solid #333',
      overflowY: 'auto', padding: '16px 0'
    }}>
      <h2 style={{ color: '#fff', padding: '0 16px', marginBottom: 16, fontSize: 16 }}>
        {course?.title}
      </h2>
      {course?.modules.map((module, i) => (
        <div
          key={module._id}
          onClick={() => setActiveModule(module)}
          style={{
            padding: '12px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: activeModule?._id === module._id ? '#2a2a3e' : 'transparent',
            borderLeft: activeModule?._id === module._id ? '3px solid #6c63ff' : '3px solid transparent',
          }}
        >
          <span style={{ fontSize: 18 }}>
            {isCompleted(module._id) ? '✅' : '⭕'}
          </span>
          <div>
            <div style={{ color: '#fff', fontSize: 14 }}>{module.title}</div>
            <div style={{ color: '#888', fontSize: 12 }}>Module {i + 1}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseSidebar