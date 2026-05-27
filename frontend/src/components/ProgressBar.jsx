import { useCourse } from '../context/CourseContext'

const ProgressBar = () => {
  const { completedCount, totalCount } = useCourse()
  const percentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div style={{ padding: '12px 24px', background: '#1e1e2e', borderBottom: '1px solid #333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: '#ccc', fontSize: 14 }}>Course Progress</span>
        <span style={{ color: '#fff', fontSize: 14 }}>{completedCount} of {totalCount} videos completed — {percentage}%</span>
      </div>
      <div style={{ background: '#333', borderRadius: 999, height: 8 }}>
        <div style={{
          width: `${percentage}%`,
          background: '#6c63ff',
          height: 8,
          borderRadius: 999,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  )
}

export default ProgressBar