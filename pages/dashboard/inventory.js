import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('product_id, product_name, sku, inventory_quantity');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    }
    fetchProducts();
  }, []);

  function getStatus(quantity) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 5) return 'Low Stock';
    return 'In Stock';
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 pb-[10px] pt-[10px] pl-[20px]">Inventory</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">SKU</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id} className="border-t">
              <td className="py-2 px-4 border">{p.sku}</td>
              <td className="py-2 px-4 border">{p.product_name}</td>
              <td className="py-2 px-4 border">{p.inventory_quantity}</td>
              <td className="py-2 px-4 border">{getStatus(p.inventory_quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
