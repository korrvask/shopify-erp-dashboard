import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          order_id,
          customer_id,
          total_price,
          order_date,
          order_line_items:order_line_items(product_id, quantity, price),
          shipping_address_id,
          billing_address_id
        `);
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        console.log('Fetched orders from Supabase:', data); // 👈 log this to verify connection
        setOrders(data);
      }
    }
    fetchOrders();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Customer ID</th>
            <th className="py-2 px-4 border">Total Price</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} className="border-t">
              <td className="py-2 px-4 border">{order.order_id}</td>
              <td className="py-2 px-4 border">{order.customer_id}</td>
              <td className="py-2 px-4 border">₱{order.total_price}</td>
              <td className="py-2 px-4 border">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">Processing</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
