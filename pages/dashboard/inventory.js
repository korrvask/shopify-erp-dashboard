import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Inventory</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.product_id} className="bg-white text-black p-6 rounded-lg shadow">
            <p className="font-semibold">{product.product_name}</p>
            <p className="text-gray-600">SKU: {product.sku}</p>
            <p className="text-gray-600">Quantity: {product.inventory_quantity}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}