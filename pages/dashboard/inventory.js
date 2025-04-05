import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Layout from '../../components/Layout'

export default function InventoryPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (error) console.error('Error fetching products:', error)
      else setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.product_id} className="bg-white p-4 rounded shadow">
            <p><strong>{p.product_name}</strong> ({p.sku})</p>
            <p>Quantity: {p.inventory_quantity}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
