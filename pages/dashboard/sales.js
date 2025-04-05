import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) console.error(error);
      else setSales(data);
    }
    fetchSales();
  }, []);

  const totalSales = sales.reduce((sum, o) => sum + parseFloat(o.total_price), 0);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sales Summary</h1>
      <p className="text-lg font-semibold mb-6 text-gray-800">Total Sales: ₱{totalSales.toFixed(2)}</p>
      <ul className="space-y-4">
        {sales.map((sale) => (
          <li key={sale.order_id} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600"><strong>Order ID:</strong> {sale.order_id}</p>
            <p className="text-gray-600"><strong>Amount:</strong> ₱{sale.total_price}</p>
            <p className="text-gray-600"><strong>Date:</strong> {new Date(sale.order_date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}