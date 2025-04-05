import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          customer_id,
          first_name,
          last_name,
          email,
          phone
        `);
      if (error) console.error('Error fetching customers:', error);
      else setCustomers(data);
    }
    fetchCustomers();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Customer ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customer_id} className="border-t">
              <td className="py-2 px-4 border">{c.customer_id}</td>
              <td className="py-2 px-4 border">{c.first_name} {c.last_name}</td>
              <td className="py-2 px-4 border">{c.email}</td>
              <td className="py-2 px-4 border">{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
