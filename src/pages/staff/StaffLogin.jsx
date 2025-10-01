import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffLogin() {
  const [username, setUsername] = useState('staff')
  const [password, setPassword] = useState('staff123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('rms_users') || '[]')
    const user = users.find(u => u.username === username && u.password === password && u.role === 'staff')
    if (!user) { setError('Invalid credentials'); return }
    sessionStorage.setItem('rms_user', JSON.stringify(user))
    navigate('/staff/tables')
  }

  return (
    <div className="max-w-sm mx-auto card p-6">
      <div className="text-lg font-semibold mb-4">Staff Login</div>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="input-primary" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input-primary" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="btn-primary" type="submit">Login</button>
      </form>
    </div>
  )
}


