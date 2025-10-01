import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminReports() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'admin') navigate('/admin/login')
  }, [navigate])

  const orders = useMemo(() => JSON.parse(localStorage.getItem('rms_orders') || '[]'), [])
  const totalSales = orders.reduce((s, o) => s + o.items.reduce((x, it) => x + it.price * it.qty, 0), 0)
  const byDay = orders.reduce((map, o) => {
    const day = new Date(o.createdAt).toISOString().slice(0,10)
    map[day] = (map[day] || 0) + o.items.reduce((x, it) => x + it.price * it.qty, 0)
    return map
  }, {})

  return (
    <div className="grid gap-6">
      <div className="card p-4">
        <div className="text-sm text-gray-600">Total Sales</div>
        <div className="text-2xl font-semibold">₹{totalSales}</div>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-3">By Day</div>
        <div className="grid gap-2">
          {Object.entries(byDay).map(([day, amt]) => (
            <div key={day} className="flex items-center justify-between text-sm">
              <div>{day}</div>
              <div>₹{amt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


