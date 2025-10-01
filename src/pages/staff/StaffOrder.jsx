import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { publishRealtime } from '@/utils/realtime'
import CardImage from '@/components/CardImage'
import PageHeader from '@/components/PageHeader'

export default function StaffOrder() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'staff') navigate('/staff/login')
  }, [navigate])

  const menu = useMemo(() => JSON.parse(localStorage.getItem('rms_menu') || '[]'), [])
  const categories = Array.from(new Set(menu.map(m => m.category)))
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '')
  const [items, setItems] = useState([])

  const add = (item) => {
    setItems(prev => {
      const ex = prev.find(p => p.id === item.id)
      if (ex) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)

  const submit = () => {
    const orders = JSON.parse(localStorage.getItem('rms_orders') || '[]')
    const newOrder = { id: 'O' + Date.now(), tableId, items, status: 'preparing', createdAt: Date.now(), payment: { method: 'cash', paid: false } }
    localStorage.setItem('rms_orders', JSON.stringify([newOrder, ...orders]))
    publishRealtime('order_created', { orderId: newOrder.id, tableId })
    navigate('/staff/tables')
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <PageHeader title={`Table ${tableId}`} subtitle="Add items and submit the order" />
        <div className="card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm text-gray-600">Table</div>
          <div className="font-semibold">{tableId}</div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button key={cat} className={`px-3 py-1.5 rounded-full border shadow-sm ${selectedCategory===cat? 'bg-primary-600 text-white border-primary-600':'bg-white hover:bg-gray-50'}`} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {menu.filter(m => !selectedCategory || m.category === selectedCategory).map(item => (
            <div key={item.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <CardImage src={item.image} alt={item.name} seed={item.name} width={600} height={360} />
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-black/60 text-white">₹{item.price}</div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">₹{item.price}</div>
                </div>
                <button className="btn-primary" onClick={() => add(item)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
      <div className="hidden md:block card p-4 h-max sticky top-20">
        <div className="font-semibold mb-2">Order</div>
        <div className="space-y-2 mb-3">
          {items.length === 0 && <div className="text-sm text-gray-500">No items yet.</div>}
          {items.map(ci => (
            <div key={ci.id} className="flex items-center justify-between text-sm">
              <div>{ci.name} × {ci.qty}</div>
              <div>₹{ci.price * ci.qty}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-medium">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button disabled={items.length===0} className="btn-primary disabled:opacity-50" onClick={submit}>Submit</button>
          <Link to="/staff/tables" className="btn-secondary">Back</Link>
        </div>
      </div>

      {/* Mobile bottom order bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{items.reduce((s,i)=>s+i.qty,0)} items</span>
            <span className="text-gray-600"> • ₹{subtotal}</span>
          </div>
          <button disabled={items.length===0} className="btn-primary disabled:opacity-50" onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  )
}


