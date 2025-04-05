import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <Link href="/dashboard/inventory" className="text-blue-600 hover:underline">Inventory</Link>
          <Link href="/dashboard/sales" className="text-blue-600 hover:underline">Sales</Link>
          <Link href="/dashboard/orders" className="text-blue-600 hover:underline">Orders</Link>
          <Link href="/dashboard/customers" className="text-blue-600 hover:underline">Customers</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  )
}
