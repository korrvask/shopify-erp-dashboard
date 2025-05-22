import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function SalesPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('order_id, customer_id, total_price, order_date');
    if (!error) setOrders(data);
  }

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
  const totalOrders = orders.length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 pb-[10px] pt-[10px] pl-[20px]">Sales</h1>
      <div className="pl-[20px] pr-[20px]">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer ID</th>
              <th className="py-2 px-4 border">Total Price</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} className="border-t">
                <td className="py-2 px-4 border">{order.order_id}</td>
                <td className="py-2 px-4 border">{order.customer_id}</td>
                <td className="py-2 px-4 border">${order.total_price}</td>
                <td className="py-2 px-4 border">{new Date(order.order_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-2 pl-[20px]">
        <p><strong>Total Revenue:</strong> ${totalRevenue.toFixed(2)}</p>
        <p><strong>Total Orders:</strong> {totalOrders}</p>
        <p><strong>Average Order Value:</strong> ${averageOrder.toFixed(2)}</p>
      </div>
    </Layout>
  );
}
