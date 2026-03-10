import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AdminProducts.css";

function AdminProducts() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // GET PRODUCTS
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);

    await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    fetchProducts();

    setName("");
    setPrice("");
    setCategory("");
    setImage(null);
    setStock("");
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (

    <div className="admin-products">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Product Management</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
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

        <input
          type="text"
          placeholder="Category (Fruit/Vegetable)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button type="submit">Add Product</button>

      </form>

      {/* PRODUCT LIST */}
      <div className="product-list">

        {products.map((product) => (

          <div key={product._id} className="product-card">

            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>Price: ₹{product.price}</p>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>

            <button onClick={() => deleteProduct(product._id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminProducts;