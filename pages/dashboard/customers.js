// Final push to fix Vercel export error
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Layout from '../../components/Layout'

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    async function fetchCustomers() {
      const { data, error } = await supabase.from('customers').select('*')
      if (error) console.error(error)
      else setCustomers(data)
    }
    fetchCustomers()
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <ul className="space-y-4">
        {customers.map((c) => (
          <li key={c.customer_id} className="bg-white p-4 rounded shadow">
            <p><strong>{c.first_name} {c.last_name}</strong></p>
            <p>Email: {c.email}</p>
            <p>Phone: {c.phone}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

