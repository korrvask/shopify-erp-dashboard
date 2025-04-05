import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Layout from '../../components/Layout'

export default function SalesPage() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    async function fetchSales() {
      const { data, error } = await supabase.from('orders').select('*')
      if (error) console.error(error)
      else setSales(data)
    }
    fetchSales()
  }, [])

  const totalSales = sales.reduce((sum, o) => sum + parseFloat(o.total_price), 0)

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Sales Summary</h1>
      <p className="text-lg font-semibold mb-6">Total Sales: ₱{totalSales.toFixed(2)}</p>
      <ul className="space-y-4">
        {sales.map((sale) => (
          <li key={sale.order_id} className="bg-white p-4 rounded shadow">
            <p><strong>Order ID:</strong> {sale.order_id}</p>
            <p><strong>Amount:</strong> ₱{sale.total_price}</p>
            <p><strong>Date:</strong> {new Date(sale.order_date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

