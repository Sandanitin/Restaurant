import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { publishRealtime } from '@/utils/realtime'

export default function CustomerCart() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const saved = useMemo(() => JSON.parse(sessionStorage.getItem('rms_cart') || '{}'), [])
  const [items, setItems] = useState(saved.items || [])
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)

  const placeOrder = () => {
    const orders = JSON.parse(localStorage.getItem('rms_orders') || '[]')
    const newOrder = {
      id: 'O' + Date.now(),
      tableId,
      items,
      status: 'preparing',
      createdAt: Date.now(),
      payment: { method: paymentMethod, paid: paymentMethod !== 'cash' ? true : false },
    }
    localStorage.setItem('rms_orders', JSON.stringify([newOrder, ...orders]))
    publishRealtime('order_created', { orderId: newOrder.id, tableId })
    sessionStorage.removeItem('rms_cart')
    navigate(`/c/order/${newOrder.id}`)
  }

  return (
    <div className="card p-6 max-w-xl mx-auto">
      <div className="text-lg font-semibold mb-4">Review Order - {tableId}</div>
      <div className="space-y-2 mb-4">
        {items.map(it => (
          <div key={it.id} className="flex items-center justify-between text-sm">
            <div>{it.name} × {it.qty}</div>
            <div>₹{it.price * it.qty}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between font-medium mb-4">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Payment Method</div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment" checked={paymentMethod==='cash'} onChange={() => setPaymentMethod('cash')} /> Cash
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment" checked={paymentMethod==='online'} onChange={() => setPaymentMethod('online')} /> Online
          </label>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={placeOrder} disabled={items.length===0}>Place Order</button>
        <Link to={`/c/menu/${tableId}`} className="btn-secondary">Back</Link>
      </div>
    </div>
  )
}


