import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useEffect, useState } from 'react'
import { subscribeRealtime } from '@/utils/realtime'
import PageHeader from '@/components/PageHeader'

export default function StaffTables() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'staff') navigate('/staff/login')
  }, [navigate])

  const tables = useMemo(() => JSON.parse(localStorage.getItem('rms_tables') || '[]'), [])
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

  const tableStatus = (tableId) => {
    const active = orders.find(o => o.tableId === tableId && (o.status === 'preparing' || o.status === 'served'))
    return active ? active.status : 'idle'
  }

  return (
    <div className="grid gap-4">
      <PageHeader title="Tables" subtitle="Select a table to place or manage orders" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tables.map(t => (
          <div key={t.id} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-gray-600">Status: {tableStatus(t.id)}</div>
              </div>
              <Link className="btn-primary" to={`/staff/order/${t.id}`}>Order</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


