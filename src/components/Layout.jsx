import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const isStaff = location.pathname.startsWith('/staff')

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white text-gray-900">
      <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold group">
            <img src="/images/logo.png" alt="logo" className="h-8 w-8 rounded" />
            <span className="group-hover:text-primary-700 transition-colors">Restaurant RMS</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link className="px-3 py-1.5 rounded hover:bg-gray-100" to="/">Home</Link>
            <Link className={`px-3 py-1.5 rounded hover:bg-gray-100 ${isStaff ? 'text-primary-700 font-semibold' : ''}`} to="/staff/login">Staff</Link>
            <Link className={`px-3 py-1.5 rounded hover:bg-gray-100 ${isAdmin ? 'text-primary-700 font-semibold' : ''}`} to="/admin/login">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {children}
      </main>
      <footer className="border-t bg-white/50">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Restaurant RMS</span>
          <span>Built with React + Tailwind</span>
        </div>
      </footer>
    </div>
  )
}


