import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#212121] font-sans">
      <nav className="bg-white shadow px-8 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex space-x-8 text-sm font-medium">
          <Link href="/dashboard/inventory" className="hover:text-blue-600">Inventory</Link>
          <Link href="/dashboard/orders" className="hover:text-blue-600">Orders</Link>
          <Link href="/dashboard/customers" className="hover:text-blue-600">Customers</Link>
          <Link href="/dashboard/sales" className="hover:text-blue-600">Sales</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-8">{children}</main>
    </div>
  );
}
