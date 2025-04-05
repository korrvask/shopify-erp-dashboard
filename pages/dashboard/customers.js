import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) console.error(error);
      else setCustomers(data);
    }
    fetchCustomers();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Customers</h1>
      <ul className="space-y-4">
        {customers.map((c) => (
          <li key={c.customer_id} className="bg-white p-6 rounded-lg shadow">
            <p className="font-semibold">{c.first_name} {c.last_name}</p>
            <p className="text-gray-600">Email: {c.email}</p>
            <p className="text-gray-600">Phone: {c.phone}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}