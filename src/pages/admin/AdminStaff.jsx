import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminStaff() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'admin') navigate('/admin/login')
  }, [navigate])

  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('rms_users') || '[]').filter(u => u.role === 'staff'))
  const [form, setForm] = useState({ name: '', username: '', password: '' })

  const save = (list) => {
    const others = JSON.parse(localStorage.getItem('rms_users') || '[]').filter(u => u.role !== 'staff')
    localStorage.setItem('rms_users', JSON.stringify([...list, ...others]))
    setUsers(list)
  }

  const add = () => {
    if (!form.name || !form.username || !form.password) return
    const entry = { id: 's' + Date.now(), role: 'staff', ...form }
    save([entry, ...users])
    setForm({ name: '', username: '', password: '' })
  }

  const remove = (id) => {
    save(users.filter(u => u.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="card p-4">
        <div className="font-semibold mb-3">Add Staff</div>
        <div className="grid sm:grid-cols-4 gap-3">
          <input className="input-primary" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="input-primary" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
          <input className="input-primary" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <button className="btn-primary" onClick={add}>Add</button>
        </div>
      </div>
      <div className="grid gap-3">
        {users.map(u => (
          <div key={u.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-600">{u.username}</div>
            </div>
            <button className="btn-secondary" onClick={() => remove(u.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}


