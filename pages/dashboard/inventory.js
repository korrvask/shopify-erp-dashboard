import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchColors();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (!error) setCategories(data);
  }

  async function fetchColors() {
    const { data, error } = await supabase.from('colors').select('*');
    if (!error) setColors(data);
  }

  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setEditedProduct({ ...product });
  };

  const handleSave = async (id) => {
    const { error } = await supabase
      .from('products')
      .update(editedProduct)
      .eq('product_id', id);

    if (!error) {
      fetchProducts();
      setEditingId(null);
      setEditedProduct({});
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('product_id', id);
    if (!error) fetchProducts();
  };

  const handleChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 pl-[20px] pb-[10px]">Inventory</h1>
      <div className="pl-[20px] pr-[20px]">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SKU</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id} className="border-t">
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <input
                      type="text"
                      value={editedProduct.sku || ''}
                      onChange={(e) => handleChange('sku', e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.sku
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <input
                      type="text"
                      value={editedProduct.product_name || ''}
                      onChange={(e) => handleChange('product_name', e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.product_name
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <select
                      value={editedProduct.product_description || ''}
                      onChange={(e) => handleChange('product_description', e.target.value)}
                      className="border px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      {colors.map((color) => (
                        <option key={color.color_name} value={color.color_name}>{color.color_name}</option>
                      ))}
                    </select>
                  ) : (
                    p.product_description
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <input
                      type="number"
                      value={editedProduct.inventory_quantity || 0}
                      onChange={(e) => handleChange('inventory_quantity', parseInt(e.target.value))}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.inventory_quantity
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <select
                      value={editedProduct.category_id || ''}
                      onChange={(e) => handleChange('category_id', e.target.value)}
                      className="border px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                      ))}
                    </select>
                  ) : (
                    p.category_id
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <button onClick={() => handleSave(p.product_id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                      Save
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(p)} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.product_id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-2">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
