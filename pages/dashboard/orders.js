import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Layout from '../../components/Layout'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from('orders').select('*')
      if (error) console.error('Error fetching orders:', error)
      else setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.order_id} className="bg-white p-4 rounded shadow">
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Total:</strong> ₱{order.total_price}</p>
            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
