import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-white shadow p-4 mb-6">
        <div className="max-w-7xl mx-auto flex space-x-6 text-lg font-medium">
          <Link href="/dashboard/inventory" className="hover:text-blue-600 transition">Inventory</Link>
          <Link href="/dashboard/sales" className="hover:text-blue-600 transition">Sales</Link>
          <Link href="/dashboard/orders" className="hover:text-blue-600 transition">Orders</Link>
          <Link href="/dashboard/customers" className="hover:text-blue-600 transition">Customers</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6">{children}</main>
    </div>
  );
}
