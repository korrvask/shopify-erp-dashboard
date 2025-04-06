import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Supabase connection failed:', error);
      } else {
        console.log('Connected to Supabase. Products:', data);
      }
    }
    testSupabase();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] text-[#212121] font-dg">
      {/* Sidebar */}
      <aside className="w-24 bg-black text-white flex flex-col items-center border-r-2 border-[#DADEE0]">
        <div className="pt-[40px]">
          <Image src="/km.svg" alt="Kilaeko Logo" width={40} height={40} />
        </div>

        <div className="flex-1 flex items-center">
          <nav className="flex flex-col items-center space-y-[10px] text-[30px] font-normal text-white">
            <Link href="/dashboard/inventory" className="hover:opacity-70 px-[40px]">Inventory</Link>
            <Link href="/dashboard/orders" className="hover:opacity-70 px-[40px]">Orders</Link>
            <Link href="/dashboard/customers" className="hover:opacity-70 px-[40px]">Customers</Link>
            <Link href="/dashboard/sales" className="hover:opacity-70 px-[40px]">Sales</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-[40px] flex justify-center">
        <h1 className="text-4xl font-bold mb-6 text-center">Kilaeko Admin Dashboard</h1>
      </main>
    </div>
  );
}
