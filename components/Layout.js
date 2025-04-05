import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const navItems = [
    { href: '/dashboard/inventory', label: 'Inventory' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/customers', label: 'Customers' },
    { href: '/dashboard/sales', label: 'Sales' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#212121]">
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-600 transition ${
                router.pathname === item.href ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
