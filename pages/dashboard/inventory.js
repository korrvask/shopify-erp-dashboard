import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_description: '',
    sku: '',
    inventory_quantity: 0,
    category_id: '',
    color_name: '',
  });
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchColors();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        product_id,
        product_name,
        product_description,
        sku,
        inventory_quantity,
        category_id,
        categories(category_id, name),
        color_name
      `);

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      const formattedData = data.map((product) => ({
        ...product,
        category_name: product.categories?.name || '-', // Flatten category name
      }));
      setProducts(formattedData);
      console.log('Fetched Products:', formattedData); // Debugging log
    }
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('category_id, name');
    if (error) console.error(error);
    else {
      setCategories(data);
      console.log('Categories:', data); // Debugging log
    }
  }

  async function fetchColors() {
    const { data, error } = await supabase.from('colors').select('color_id, color_name');
    if (error) console.error(error);
    else {
      setColors(data);
      console.log('Colors:', data); // Debugging log
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.product_id);

    console.log('Editing Product:', product); // Debugging log

    setEditedProduct({
      product_name: product.product_name || '',
      product_description: product.product_description || '',
      sku: product.sku || '',
      inventory_quantity: product.inventory_quantity || 0,
      category_id: product.category_id || '',
      color_name: product.color_name || '',
    });
  };

  const handleSave = async (id) => {
    console.log('Saving Edited Product:', editedProduct); // Debugging log

    if (!editedProduct.category_id || !editedProduct.color_name) {
      alert("Please select both category and color before saving.");
      return;
    }

    const { error } = await supabase
      .from('products')
      .update(editedProduct)
      .eq('product_id', id);

    if (error) {
      console.error('Error updating product:', error);
    } else {
      setEditingId(null);
      setEditedProduct({});
      fetchProducts();
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.product_name || !newProduct.sku || !newProduct.category_id || !newProduct.color_name) {
      alert("Please fill in product name, SKU, category, and color before adding.");
      return;
    }

    const { error } = await supabase.from('products').insert([{
      product_name: newProduct.product_name,
      product_description: newProduct.product_description,
      sku: newProduct.sku,
      inventory_quantity: newProduct.inventory_quantity,
      category_id: newProduct.category_id,
      color_name: newProduct.color_name,
    }]);

    if (error) {
      console.error('Error adding product:', error);
    } else {
      setNewProduct({
        product_name: '',
        product_description: '',
        sku: '',
        inventory_quantity: 0,
        category_id: '',
        color_name: '',
      });
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('product_id', id);

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      fetchProducts();
    }
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
              <th className="py-2 px-4 border">Color</th>
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
                      value={editedProduct.sku}
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
                      value={editedProduct.product_name}
                      onChange={(e) => handleChange('product_name', e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.product_name
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <input
                      type="text"
                      value={editedProduct.product_description}
                      onChange={(e) => handleChange('product_description', e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.product_description
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <input
                      type="number"
                      value={editedProduct.inventory_quantity}
                      onChange={(e) => handleChange('inventory_quantity', e.target.value)}
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
                      className="border px-2 py-1 w-full bg-white text-black rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    p.category_name || '-' // Use flattened category_name
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <select
                      value={editedProduct.color_name || ''}
                      onChange={(e) => handleChange('color_name', e.target.value)}
                      className="border px-2 py-1 w-full bg-white text-black rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      {colors.map((color) => (
                        <option key={color.color_name} value={color.color_name}>
                          {color.color_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    p.color_name || '-'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingId === p.product_id ? (
                    <button
                      onClick={() => handleSave(p.product_id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.product_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {/* Add New Product Row */}
            <tr className="border-t bg-gray-50">
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={newProduct.product_name}
                  onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={newProduct.product_description}
                  onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="number"
                  value={newProduct.inventory_quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, inventory_quantity: parseInt(e.target.value) })}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <select
                  value={newProduct.category_id || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                  className="border px-2 py-1 w-full bg-white text-black rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 border">
                <select
                  value={newProduct.color_name || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, color_name: e.target.value })}
                  className="border px-2 py-1 w-full bg-white text-black rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select</option>
                  {colors.map((color) => (
                    <option key={color.color_name} value={color.color_name}>
                      {color.color_name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={handleAddProduct}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}