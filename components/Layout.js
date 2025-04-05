import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const links = [
    { name: 'Inventory', path: '/dashboard/inventory' },
    { name: 'Orders', path: '/dashboard/orders' },
    { name: 'Customers', path: '/dashboard/customers' },
    { name: 'Sales', path: '/dashboard/sales' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#212121]">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex space-x-6 font-medium text-sm">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-blue-600 ${
                router.pathname === link.path ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
