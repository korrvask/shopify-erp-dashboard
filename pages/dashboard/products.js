import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function ProductsPage() {
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_description: '', // used as color
    inventory_quantity: 0,
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchColors();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (!error) setCategories(data);
  }

  async function fetchColors() {
    const { data, error } = await supabase.from('colors').select('*');
    if (!error) setColors(data);
  }

  const handleCreateProduct = async () => {
    const productToInsert = { ...newProduct };
    const { error } = await supabase.from('products').insert([productToInsert]);

    if (!error) {
      setNewProduct({
        product_name: '',
        product_description: '',
        inventory_quantity: 0,
        category_id: ''
      });
      setSuccessMsg('Product successfully created.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 pb-[10px] pt-[10px] pl-[20px]">Add Product</h1>
      <div className="pl-[20px] pr-[20px] max-w-xl">
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={newProduct.product_name}
          onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
          className="border px-3 py-2 mb-4 w-full"
        />

        <label className="block mb-2">Color (Description)</label>
        <select
          value={newProduct.product_description}
          onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
          className="border px-3 py-2 mb-4 w-full"
        >
          <option value="">Select</option>
          {colors.map((color) => (
            <option key={color.color_name} value={color.color_name}>{color.color_name}</option>
          ))}
        </select>

        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          value={newProduct.inventory_quantity}
          onChange={(e) => setNewProduct({ ...newProduct, inventory_quantity: parseInt(e.target.value) })}
          className="border px-3 py-2 mb-4 w-full"
        />

        <label className="block mb-2">Category</label>
        <select
          value={newProduct.category_id}
          onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          className="border px-3 py-2 mb-6 w-full"
        >
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
          ))}
        </select>

        <button
          onClick={handleCreateProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </div>
    </Layout>
  );
}
