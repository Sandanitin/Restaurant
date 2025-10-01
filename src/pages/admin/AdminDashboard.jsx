import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import PageHeader from '@/components/PageHeader'

export default function AdminDashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('rms_user') || 'null')
    if (!user || user.role !== 'admin') navigate('/admin/login')
  }, [navigate])

  const orders = useMemo(() => JSON.parse(localStorage.getItem('rms_orders') || '[]'), [])
  const todaySales = orders
    .filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
    .reduce((s, o) => s + o.items.reduce((x, it) => x + it.price * it.qty, 0), 0)

  return (
    <div className="grid gap-8">
      <PageHeader title="Dashboard" subtitle="Overview of sales and operations" />
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Today Sales</div>
          <div className="text-3xl font-semibold">₹{todaySales}</div>
        </div>
        <div className="card p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-3xl font-semibold">{orders.length}</div>
        </div>
        <div className="card p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-3xl font-semibold">{orders.filter(o=>o.status!=='completed').length}</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/menu" className="card p-5 hover:shadow-md transition-shadow">Manage Menu</Link>
        <Link to="/admin/staff" className="card p-5 hover:shadow-md transition-shadow">Manage Staff</Link>
        <Link to="/admin/orders" className="card p-5 hover:shadow-md transition-shadow">Orders</Link>
        <Link to="/admin/reports" className="card p-5 hover:shadow-md transition-shadow">Reports</Link>
      </div>
    </div>
  )
}


