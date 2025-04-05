import Link from 'next/link';

export default function Home() { 
  return (
    <div className="bg-white text-black p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Kilaeko</h1>
      <p className="text-gray-700 mb-6">ERP System</p>

      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/inventory">
          <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
            Inventory
          </span>
        </Link>
        <Link href="/dashboard/orders">
          <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
            Orders
          </span>
        </Link>
        <Link href="/dashboard/customers">
          <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
            Customers
          </span>
        </Link>
        <Link href="/dashboard/sales">
          <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
            Sales
          </span>
        </Link>
      </div>
    </div>
  );
}
