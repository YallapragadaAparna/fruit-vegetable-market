import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api"; // ✅ removed IMAGE_URL
import "./AdminProducts.css";

function AdminProducts() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");

  const [editId, setEditId] = useState(null);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD / UPDATE PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editId) {
        await api.put(`/products/${editId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      fetchProducts();

      // reset form
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setImage(null);
      setEditId(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.log("ADD/UPDATE ERROR:", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  return (
    <div className="admin-products">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Product Management</h2>

        <div className="header-buttons">
          <button
            onClick={() => navigate("/admin-orders")}
            className="view-orders-btn"
          >
            View Orders
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* PRODUCT FORM */}
      <form onSubmit={addProduct} className="product-form">

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>

        {/* IMAGE */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required={!editId} // ✅ FIXED
        />

        {/* STOCK */}
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        >
          <option value="">Select Stock Status</option>
          <option value="Full">Full</option>
          <option value="Limited">Limited</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* PRODUCT LIST */}
      <div className="product-list">

        {products.map((product) => (
          <div key={product._id} className="product-card">

            {/* ✅ FIXED IMAGE */}
            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p className="price">Price: ₹{product.price}</p>

            <p className={`category ${product.category.toLowerCase()}`}>
              {product.category}
            </p>

            <p className={`stock-status ${product.stock.replace(/\s/g, "").toLowerCase()}`}>
              {product.stock}
            </p>

            <div className="card-buttons">

              <button
                onClick={() => deleteProduct(product._id)}
                className="delete-btn"
              >
                Delete
              </button>

              <button
                className="update-btn"
                onClick={() => {
                  setEditId(product._id);
                  setName(product.name);
                  setPrice(product.price);
                  setCategory(product.category);
                  setStock(product.stock);
                }}
              >
                Update
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminProducts;
