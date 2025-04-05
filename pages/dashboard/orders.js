import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) console.error('Error fetching orders:', error);
      else setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.order_id}
            className="bg-white text-black p-6 rounded-lg shadow border"
          >
            <p className="mb-2"><strong>Order ID:</strong> {order.order_id}</p>
            <p className="mb-2"><strong>Total:</strong> ₱{order.total_price}</p>
            <p className="mb-4"><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}