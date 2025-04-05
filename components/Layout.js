import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#212121] font-sans flex">
      {/* Sidebar Menu */}
      <nav className="bg-white shadow w-64 h-screen p-6 flex flex-col space-y-4 text-sm font-medium">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <Link href="/dashboard/inventory" className="hover:text-blue-600 py-2">
          Inventory
        </Link>
        <Link href="/dashboard/orders" className="hover:text-blue-600 py-2">
          Orders
        </Link>
        <Link href="/dashboard/customers" className="hover:text-blue-600 py-2">
          Customers
        </Link>
        <Link href="/dashboard/sales" className="hover:text-blue-600 py-2">
          Sales
        </Link>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}