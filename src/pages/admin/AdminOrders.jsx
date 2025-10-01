import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { publishRealtime, subscribeRealtime } from '@/utils/realtime'
import PageHeader from '@/components/PageHeader'

export default function AdminOrders() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'admin') navigate('/admin/login')
  }, [navigate])

  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('rms_orders') || '[]'))

  useEffect(() => {
    const unsub = subscribeRealtime(msg => {
      if (!msg) return
      if (msg.eventType === 'order_created' || msg.eventType === 'order_updated') {
        setOrders(JSON.parse(localStorage.getItem('rms_orders') || '[]'))
      }
    })
    return unsub
  }, [])

  const updateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o)
    setOrders(updated)
    localStorage.setItem('rms_orders', JSON.stringify(updated))
    publishRealtime('order_updated', { orderId: id, status })
  }

  return (
    <div className="grid gap-4">
      <PageHeader title="Orders" subtitle="Live orders across all tables" />
      {orders.map(o => (
        <div key={o.id} className="card p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{o.id} • Table {o.tableId}</div>
            <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm mb-3">Items: {o.items.map(i=>`${i.name}×${i.qty}`).join(', ')}</div>
          <div className="flex items-center gap-2">
            {['preparing','served','completed'].map(s => (
              <button key={s} className={`px-3 py-1.5 rounded-full border shadow-sm ${o.status===s ? 'bg-primary-600 text-white border-primary-600' : 'bg-white hover:bg-gray-50'}`} onClick={() => updateStatus(o.id, s)}>{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


