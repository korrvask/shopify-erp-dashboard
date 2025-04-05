import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()

  const navItems = [
    { href: '/dashboard/inventory', label: 'Inventory' },
    { href: '/dashboard/sales', label: 'Sales' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/customers', label: 'Customers' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-start space-x-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition 
                ${router.pathname === href
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100 hover:text-blue-600'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
