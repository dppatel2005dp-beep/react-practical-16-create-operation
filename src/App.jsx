import React, { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Mechanical Keyboard", category: "Electronics", price: 4999, stock: 15, desc: "Compact 75% hot-swappable RGB keyboard" },
    { id: 2, name: "Ergonomic Office Chair", category: "Furniture", price: 12500, stock: 8, desc: "Breathable mesh with lumbar support" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
    desc: ""
  });

  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.stock) {
      alert("Please fill in product name, price, and stock quantity!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      desc: formData.desc.trim() || "No description provided."
    };

    setProducts([newProduct, ...products]);
    setAlertMsg(`Product "${newProduct.name}" added successfully!`);

    // Reset Form
    setFormData({
      name: "",
      category: "Electronics",
      price: "",
      stock: "",
      desc: ""
    });

    setTimeout(() => setAlertMsg(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Unit 5 - Practical 6 (Practical 16)
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
            Product Management (Create Operation)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter product details through a controlled form and add new products to the application state.
          </p>
        </header>

        {alertMsg && (
          <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center justify-between">
            <span>✅ {alertMsg}</span>
            <button onClick={() => setAlertMsg("")} className="text-emerald-900 font-bold">&times;</button>
          </div>
        )}

        {/* Create Product Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>➕</span> Add New Product
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ultra HD Webcam"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 2999"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                name="desc"
                rows="2"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Product specifications, highlights..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition"
            >
              Add Product to Catalog
            </button>
          </form>
        </div>

        {/* Product Catalog Display */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              📦 Product Inventory ({products.length} Items)
            </h3>
            <span className="text-xs bg-gray-200 text-gray-700 font-semibold px-3 py-1 rounded-full">
              Total Value: ₹{products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-emerald-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gray-100 text-gray-700">
                    {p.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${p.stock > 5 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                    {p.stock > 5 ? `${p.stock} In Stock` : `Low Stock: ${p.stock}`}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-base">{p.name}</h4>
                <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-lg font-extrabold text-emerald-600">₹{p.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">ID: {p.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
