import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F7F7F7] text-[#212121] font-dg">
      {/* Sidebar */}
      <aside className="w-24 bg-black text-white flex flex-col items-center border-r-2 border-[#DADEE0]">
        {/* Logo with 40px top padding */}
        <div className="pt-[40px]">
          <Link href="/">
            <Image
              src="/km.svg"
              alt="Kilaeko Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Vertical navigation buttons */}
        <div className="flex-1 flex items-center">
          <nav className="flex flex-col items-center space-y-[10px] text-[30px] font-normal text-white">
            <Link
              href="/dashboard/inventory"
              className="hover:opacity-70 px-[40px]"
            >
              Inventory
            </Link>
            <Link
              href="/dashboard/orders"
              className="hover:opacity-70 px-[40px]"
            >
              Orders
            </Link>
            <Link
              href="/dashboard/customers"
              className="hover:opacity-70 px-[40px]"
            >
              Customers
            </Link>
            <Link
              href="/dashboard/products"
              className="hover:opacity-70 px-[40px]"
            >
              Products
            </Link>
            <Link
              href="/dashboard/sales"
              className="hover:opacity-70 px-[40px]"
            >
              Sales
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main dashboard content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
