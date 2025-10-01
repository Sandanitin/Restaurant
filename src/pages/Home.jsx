import { Link } from 'react-router-dom'

export default function Home() {
  const exampleTableId = 'T1'
  return (
    <div className="grid gap-8">
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-emerald-600 text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(#fff 1px, transparent 1px)', backgroundSize:'20px 20px'}} />
        <div className="relative px-6 py-12 md:px-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Modern Restaurant Management</h1>
          <p className="text-white/90 max-w-2xl">QR ordering, staff tablet, and admin dashboard in one elegant experience.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to={`/c/menu/${exampleTableId}`} className="inline-flex items-center px-4 py-2 rounded-md bg-white text-primary-700 font-medium shadow hover:shadow-md">Try Customer Menu</Link>
            <Link to="/staff/login" className="inline-flex items-center px-4 py-2 rounded-md bg-white/10 ring-1 ring-white/30 hover:bg-white/20">Staff Portal</Link>
            <Link to="/admin/login" className="inline-flex items-center px-4 py-2 rounded-md bg-white/10 ring-1 ring-white/30 hover:bg-white/20">Admin Dashboard</Link>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <div className="card p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1">Customer</h3>
          <p className="text-sm text-gray-600">Scan QR, browse categories, add to cart, and pay.</p>
        </div>
        <div className="card p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1">Staff</h3>
          <p className="text-sm text-gray-600">Tablet-friendly table list, quick order entry, and status updates.</p>
        </div>
        <div className="card p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1">Admin</h3>
          <p className="text-sm text-gray-600">Manage menu, staff accounts, live orders, and sales reports.</p>
        </div>
      </section>
    </div>
  )
}


