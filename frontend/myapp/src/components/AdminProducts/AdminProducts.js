// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import "./AdminProducts.css";

// function AdminProducts() {

//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [stock, setStock] = useState("");

//   // LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // GET PRODUCTS
//   const fetchProducts = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ADD PRODUCT
//   const addProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("stock", stock);
//     formData.append("image", image);

//     await api.post("/products", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     });

//     fetchProducts();

//     setName("");
//     setPrice("");
//     setCategory("");
//     setImage(null);
//     setStock("");
//   };

//   // DELETE PRODUCT
//   const deleteProduct = async (id) => {
//     await api.delete(`/products/${id}`);
//     fetchProducts();
//   };

//   return (

//     <div className="admin-products">

//       {/* HEADER */}
//       <div className="admin-header">
//         <h2>Admin Product Management</h2>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </div>

//       {/* ADD PRODUCT FORM */}
//       <form onSubmit={addProduct} className="product-form">

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category (Fruit/Vegetable)"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />

//         {/* IMAGE UPLOAD */}
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />

//       {/*  <input
//           type="number"
//           placeholder="Stock"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//         />*/}
//             <select
//            value={stock}
//            onChange={(e) => setStock(e.target.value)}
//              required
//                 >
//                 <option value="">Select Stock Status</option>
//               <option value="Full">Full</option>
//                <option value="Limited">Limited</option>
//             <option value="Out of Stock">Out of Stock</option>
//                 </select>

//         <button type="submit">Add Product</button>

//       </form>

//       {/* PRODUCT LIST */}
//       <div className="product-list">

//         {products.map((product) => (

//           <div key={product._id} className="product-card">

//             <img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.name}
//             />

//             <h3>{product.name}</h3>

//             <p>Price: ₹{product.price}</p>

//             <p>Category: {product.category}</p>

//             {/* <p>Stock: {product.stock}</p>
//             <p>
//              Stock: 
//                {product.stock === "Full" && " Full ✅"}
//               {product.stock === "Limited" && " Limited ⚠️"}
//               {product.stock === "Out of Stock" && " Out of Stock ❌"}
//                   </p>   */}
//                   <p className={`stock-status ${product.stock.replace(/\s/g, "").toLowerCase()}`}>
//              {product.stock}
//                </p>

//             <button onClick={() => deleteProduct(product._id)}>
//               Delete
//             </button>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default AdminProducts;
import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
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
  //const [preview, setPreview] = useState(null);

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

    if (editId) {
      await api.put(`/products/${editId}`, formData);
    } else {
      await api.post("/products", formData);
    }

    fetchProducts();

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage(null);
    //setPreview(null);
    setEditId(null);
    if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

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
        <button onClick={() => navigate("/admin-orders")}>
View Orders
</button>
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

        {/* IMAGE UPLOAD *
        <div className="image-upload">

          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => {

              const file = e.target.files[0];

              if (file && file.type !== "image/jpeg") {
                alert("Only JPG images allowed");
                return;
              }

              setImage(file);
              setPreview(URL.createObjectURL(file));

            }}
          />

          {preview && (
            <div className="preview-box">

              <img src={preview} alt="preview" />

              <span
                className="remove-image"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
              >
                ✖
              </span>

            </div>
          )}

        </div>*/}
         {/* IMAGE UPLOAD */}
        <input
          type="file"
           ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
         required
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

            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p className="price">Price: ₹{product.price}</p>

            {/* CATEGORY BADGE */}
            <p className={`category ${product.category.toLowerCase()}`}>
              {product.category}
            </p>

            {/* STOCK BADGE */}
            <p className={`stock-status ${product.stock.replace(/\s/g,"").toLowerCase()}`}>
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