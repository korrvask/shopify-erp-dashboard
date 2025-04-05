import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex space-x-6">
          <Link href="/dashboard/inventory" className="text-blue-600 font-medium hover:underline">Inventory</Link>
          <Link href="/dashboard/sales" className="text-blue-600 font-medium hover:underline">Sales</Link>
          <Link href="/dashboard/orders" className="text-blue-600 font-medium hover:underline">Orders</Link>
          <Link href="/dashboard/customers" className="text-blue-600 font-medium hover:underline">Customers</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
