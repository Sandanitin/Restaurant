import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import CustomerMenu from './pages/customer/CustomerMenu'
import CustomerCart from './pages/customer/CustomerCart'
import CustomerOrderStatus from './pages/customer/CustomerOrderStatus'
import StaffLogin from './pages/staff/StaffLogin'
import StaffTables from './pages/staff/StaffTables'
import StaffOrder from './pages/staff/StaffOrder'
import StaffHistory from './pages/staff/StaffHistory'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMenu from './pages/admin/AdminMenu'
import AdminStaff from './pages/admin/AdminStaff'
import AdminOrders from './pages/admin/AdminOrders'
import AdminReports from './pages/admin/AdminReports'

export default function App() {
  useEffect(() => {
    // Seed minimal demo data on first load if not present
    const seeded = localStorage.getItem('rms_seeded_v1')
    if (!seeded) {
      const demoMenu = [
        // South Indian
        { id: 'm1', name: 'Masala Dosa', price: 120, category: 'South Indian', available: true, image: 'https://picsum.photos/seed/masala-dosa/600/360' },
        { id: 'm2', name: 'Idli Sambar', price: 80, category: 'South Indian', available: true, image: 'https://picsum.photos/seed/idli-sambar/600/360' },
        { id: 'm6', name: 'Medu Vada', price: 90, category: 'South Indian', available: true, image: 'https://picsum.photos/seed/medu-vada/600/360' },

        // Main Course
        { id: 'm3', name: 'Veg Biryani', price: 160, category: 'Main Course', available: true, image: 'https://picsum.photos/seed/veg-biryani/600/360' },
        { id: 'm7', name: 'Paneer Butter Masala', price: 190, category: 'Main Course', available: true, image: 'https://picsum.photos/seed/paneer-butter-masala/600/360' },
        { id: 'm8', name: 'Chicken Curry', price: 220, category: 'Main Course', available: true, image: 'https://picsum.photos/seed/chicken-curry/600/360' },

        // Breads
        { id: 'm4', name: 'Butter Naan', price: 40, category: 'Breads', available: true, image: 'https://picsum.photos/seed/butter-naan/600/360' },
        { id: 'm9', name: 'Garlic Naan', price: 60, category: 'Breads', available: true, image: 'https://picsum.photos/seed/garlic-naan/600/360' },
        { id: 'm10', name: 'Tandoori Roti', price: 25, category: 'Breads', available: true, image: 'https://picsum.photos/seed/tandoori-roti/600/360' },

        // Starters
        { id: 'm11', name: 'Veg Manchurian', price: 150, category: 'Starters', available: true, image: 'https://picsum.photos/seed/veg-manchurian/600/360' },
        { id: 'm12', name: 'Chicken Tikka', price: 230, category: 'Starters', available: true, image: 'https://picsum.photos/seed/chicken-tikka/600/360' },

        // Beverages
        { id: 'm5', name: 'Lassi', price: 60, category: 'Beverages', available: true, image: 'https://picsum.photos/seed/lassi/600/360' },
        { id: 'm13', name: 'Masala Chai', price: 30, category: 'Beverages', available: true, image: 'https://picsum.photos/seed/masala-chai/600/360' },
        { id: 'm14', name: 'Fresh Lime Soda', price: 50, category: 'Beverages', available: true, image: 'https://picsum.photos/seed/fresh-lime-soda/600/360' },

        // Desserts
        { id: 'm15', name: 'Gulab Jamun', price: 80, category: 'Desserts', available: true, image: 'https://picsum.photos/seed/gulab-jamun/600/360' },
        { id: 'm16', name: 'Rasmalai', price: 120, category: 'Desserts', available: true, image: 'https://picsum.photos/seed/rasmalai/600/360' },
      ]
      const tables = Array.from({ length: 10 }).map((_, i) => ({ id: `T${i + 1}`, name: `Table ${i + 1}` }))
      const staff = [ { id: 's1', name: 'Staff One', username: 'staff', password: 'staff123', role: 'staff' } ]
      const admin = [ { id: 'a1', name: 'Admin', username: 'admin', password: 'admin123', role: 'admin' } ]
      localStorage.setItem('rms_menu', JSON.stringify(demoMenu))
      localStorage.setItem('rms_tables', JSON.stringify(tables))
      localStorage.setItem('rms_orders', JSON.stringify([]))
      localStorage.setItem('rms_users', JSON.stringify([...staff, ...admin]))
      localStorage.setItem('rms_seeded_v1', 'true')
    }
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Customer */}
        <Route path="/c/menu/:tableId" element={<CustomerMenu />} />
        <Route path="/c/cart/:tableId" element={<CustomerCart />} />
        <Route path="/c/order/:orderId" element={<CustomerOrderStatus />} />

        {/* Staff */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/tables" element={<StaffTables />} />
        <Route path="/staff/order/:tableId" element={<StaffOrder />} />
        <Route path="/staff/history" element={<StaffHistory />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/reports" element={<AdminReports />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}


