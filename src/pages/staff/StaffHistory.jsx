import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffHistory() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'staff') navigate('/staff/login')
  }, [navigate])

  const orders = useMemo(() => JSON.parse(localStorage.getItem('rms_orders') || '[]'), [])

  return (
    <div className="grid gap-3">
      {orders.map(o => (
        <div key={o.id} className="card p-4 flex items-center justify-between">
          <div>
            <div className="font-medium">{o.id} • Table {o.tableId}</div>
            <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm px-2 py-1 rounded bg-gray-100">{o.status}</div>
        </div>
      ))}
    </div>
  )
}


