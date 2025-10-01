import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminMenu() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'admin') navigate('/admin/login')
  }, [navigate])

  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('rms_menu') || '[]'))
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' })

  const save = (list) => {
    setItems(list)
    localStorage.setItem('rms_menu', JSON.stringify(list))
  }

  const add = () => {
    if (!form.name || !form.price || !form.category) return
    const entry = { id: 'm' + Date.now(), name: form.name, price: Number(form.price), category: form.category, available: true, image: form.image || '' }
    save([entry, ...items])
    setForm({ name: '', price: '', category: '', image: '' })
  }

  const remove = (id) => {
    save(items.filter(i => i.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="card p-4">
        <div className="font-semibold mb-3">Add Item</div>
        <div className="grid sm:grid-cols-5 gap-3">
          <input className="input-primary" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="input-primary" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
          <input className="input-primary" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
          <input className="input-primary" placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm({...form, image: e.target.value})} />
          <button className="btn-primary" onClick={add}>Add</button>
        </div>
      </div>

      <div className="grid gap-3">
        {items.map(it => (
          <div key={it.id} className="card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {it.image && <img src={it.image} alt="" className="h-12 w-16 object-cover rounded" />}
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">₹{it.price} • {it.category}</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => remove(it.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}


