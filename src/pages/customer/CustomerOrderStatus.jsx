import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { subscribeRealtime } from '@/utils/realtime'

export default function CustomerOrderStatus() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(() => {
    const orders = JSON.parse(localStorage.getItem('rms_orders') || '[]')
    return orders.find(o => o.id === orderId)
  })

  useEffect(() => {
    const unsub = subscribeRealtime(msg => {
      if (!msg || !msg.eventType) return
      if (msg.eventType === 'order_updated') {
        const orders = JSON.parse(localStorage.getItem('rms_orders') || '[]')
        const found = orders.find(o => o.id === orderId)
        if (found) setOrder(found)
      }
    })
    return unsub
  }, [orderId])

  if (!order) {
    return (
      <div className="card p-6 max-w-md mx-auto">
        <div className="font-semibold mb-2">Order not found</div>
        <Link className="btn-secondary" to="/">Home</Link>
      </div>
    )
  }

  return (
    <div className="card p-6 max-w-xl mx-auto">
      <div className="text-lg font-semibold mb-1">Order {order.id}</div>
      <div className="text-sm text-gray-600 mb-4">Table {order.tableId}</div>
      <div className="space-y-2 mb-4">
        {order.items.map(it => (
          <div key={it.id} className="flex items-center justify-between text-sm">
            <div>{it.name} × {it.qty}</div>
            <div>₹{it.price * it.qty}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="font-medium">Status</div>
        <div>
          {/* Status badge component can be inlined here to avoid extra import complexity */}
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ring-1 ring-inset ${order.status==='preparing'?'bg-amber-100 text-amber-800 ring-amber-200':order.status==='served'?'bg-blue-100 text-blue-800 ring-blue-200':order.status==='completed'?'bg-emerald-100 text-emerald-800 ring-emerald-200':'bg-gray-100 text-gray-700 ring-gray-200'}`}>{order.status}</span>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/" className="btn-secondary">Home</Link>
      </div>
    </div>
  )
}


