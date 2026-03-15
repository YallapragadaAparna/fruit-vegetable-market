// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api, { IMAGE_URL } from "../../services/api";
// import "./Dashboard.css";

// function Dashboard() {

//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);
//   const [weights, setWeights] = useState({});
//   const [counts, setCounts] = useState({});
//   const [cartCount, setCartCount] = useState(0);

//   // SEARCH FILTER
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     try {

//       const res = await api.get("/products");

//       setProducts(res.data);

//       const defaultWeights = {};
//       const defaultCounts = {};

//       res.data.forEach((p) => {
//         defaultWeights[p._id] = "250g";
//         defaultCounts[p._id] = 1;
//       });

//       setWeights(defaultWeights);
//       setCounts(defaultCounts);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Weight change
//   const handleWeightChange = (id, value) => {
//     setWeights({
//       ...weights,
//       [id]: value
//     });
//   };

//   // Increase quantity
//   const increaseQty = (id) => {
//     setCounts({
//       ...counts,
//       [id]: counts[id] + 1
//     });
//   };

//   // Decrease quantity
//   const decreaseQty = (id) => {
//     if (counts[id] > 1) {
//       setCounts({
//         ...counts,
//         [id]: counts[id] - 1
//       });
//     }
//   };

//   // Calculate price based on weight
//   const getPriceByWeight = (basePrice, weight) => {

//     if (weight === "250g") return basePrice;
//     if (weight === "500g") return basePrice * 2;
//     if (weight === "1kg") return basePrice * 4;

//     return basePrice;
//   };

//   // Add to cart
//   const addToCart = async (product) => {

//     if (product.stock === "Out of Stock") {
//       alert("This product is out of stock");
//       return;
//     }

//     const weight = weights[product._id];
//     const quantity = counts[product._id];
//     const price = getPriceByWeight(product.price, weight);

//     try {

//       await api.post("/cart/add", {
//         productId: product._id,
//         name: product.name,
//         image: product.image,
//         weight,
//         quantity,
//         price
//       });

//       setCartCount(cartCount + quantity);

//       alert("Product added to cart");

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (
//     <div>

//       {/* HEADER */}

//       <div className="dashboard-header">

//         <h2 className="logo">Fresh Cart</h2>

//         <div className="search-section">
//           <input
//             type="text"
//             placeholder="🔍 Search fruits or vegetables..."
//             className="search-bar"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <ul className="menu">

//           <li><Link to="/fruits">Fruits</Link></li>

//           <li><Link to="/vegetables">Vegetables</Link></li>

//           {/* CART WITH BADGE */}

//           <li className="cart-link">
//             <Link to="/cartpage">🛒 Cart</Link>
//             {cartCount > 0 && (
//               <span className="cart-count">{cartCount}</span>
//             )}
//           </li>

//           <li className="profile-icon">👤</li>

//           <li>
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           </li>

//         </ul>

//       </div>


//       {/* PRODUCTS SECTION */}

//       <div className="products-section">

//         <h3>Available Products</h3>

//         <div className="product-grid">

//           {filteredProducts.length === 0 ? (
//             <p>No products found</p>
//           ) : (
//             filteredProducts.map((product) => {

//               const weight = weights[product._id];
//               const price = getPriceByWeight(product.price, weight);
//               const quantity = counts[product._id];

//               return (

//                 <div key={product._id} className="product-card">

//                   <img
//                     src={`${IMAGE_URL}${product.image}`}
//                     alt={product.name}
//                     className="product-image"
//                   />

//                   <h3>{product.name}</h3>

//                   <p>Price: ₹{price}</p>

//                   <span className={`category ${product.category.toLowerCase()}`}>
//                     {product.category}
//                   </span>

//                   {/* STOCK BADGE */}

//                   <span
//                     className={`stock-badge ${product.stock
//                       .toLowerCase()
//                       .replaceAll(" ", "-")}`}
//                   >
//                     {product.stock}
//                   </span>


//                   {/* WEIGHT SELECT */}

//                   <select
//                     value={weight}
//                     onChange={(e) =>
//                       handleWeightChange(product._id, e.target.value)
//                     }
//                   >
//                     <option value="250g">250g</option>
//                     <option value="500g">500g</option>
//                     <option value="1kg">1kg</option>
//                   </select>


//                   {/* QUANTITY */}

//                   <div className="quantity-controls">

//                     <button
//                       onClick={() => decreaseQty(product._id)}
//                       disabled={product.stock === "Out of Stock"}
//                     >
//                       -
//                     </button>

//                     <span>{quantity}</span>

//                     <button
//                       onClick={() => increaseQty(product._id)}
//                       disabled={product.stock === "Out of Stock"}
//                     >
//                       +
//                     </button>

//                   </div>


//                   {/* TOTAL PRICE */}

//                   <p className="total-price">
//                     Total: ₹{price * quantity}
//                   </p>


//                   {/* ADD TO CART */}

//                   <button
//                     className={`cart-btn ${
//                       product.stock === "Out of Stock" ? "disabled-btn" : ""
//                     }`}
//                     disabled={product.stock === "Out of Stock"}
//                     onClick={() => addToCart(product)}
//                   >
//                     {product.stock === "Out of Stock"
//                       ? "Out of Stock"
//                       : "Add to Cart"}
//                   </button>

//                 </div>

//               );

//             })
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { IMAGE_URL } from "../../services/api";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [weights, setWeights] = useState({});
  const [counts, setCounts] = useState({});
  const [cartCount, setCartCount] = useState(0);

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch products
  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

      const defaultWeights = {};
      const defaultCounts = {};

      res.data.forEach((p) => {
        defaultWeights[p._id] = "250g";
        defaultCounts[p._id] = 1;
      });

      setWeights(defaultWeights);
      setCounts(defaultCounts);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  // Weight change
  const handleWeightChange = (id, value) => {

    setWeights({
      ...weights,
      [id]: value
    });

  };

  // Increase quantity
  const increaseQty = (id) => {

    setCounts({
      ...counts,
      [id]: counts[id] + 1
    });

  };

  // Decrease quantity
  const decreaseQty = (id) => {

    if (counts[id] > 1) {

      setCounts({
        ...counts,
        [id]: counts[id] - 1
      });

    }

  };

  // Calculate price based on weight
  const getPriceByWeight = (basePrice, weight) => {

    if (weight === "250g") return basePrice;
    if (weight === "500g") return basePrice * 2;
    if (weight === "1kg") return basePrice * 4;

    return basePrice;

  };

  // Add to cart
  const addToCart = async (product) => {

    if (product.stock === "Out of Stock") {

      alert("This product is out of stock");
      return;

    }

    const weight = weights[product._id];
    const quantity = counts[product._id];
    const price = getPriceByWeight(product.price, weight);

    try {

      await api.post("/cart/add", {
        productId: product._id,
        name: product.name,
        image: product.image,
        weight,
        quantity,
        price
      });

      setCartCount(cartCount + quantity);

      alert("Product added to cart");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      {/* HEADER */}

      <div className="dashboard-header">

        <h2 className="logo">Fresh Cart</h2>

        {/* SEARCH BAR */}

        <div className="search-section">

          <input
            type="text"
            placeholder="🔍 Search fruits or vegetables..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        {/* MENU */}

        <ul className="menu">

          <li>
            <Link to="/fruits">Fruits</Link>
          </li>

          <li>
            <Link to="/vegetables">Vegetables</Link>
          </li>

          {/* MY ORDERS */}

          <li>
            <Link to="/my-orders">📦 My Orders</Link>
          </li>

          {/* CART */}

          <li className="cart-link">

            <Link to="/cartpage">🛒 Cart</Link>

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}

          </li>

          <li className="profile-icon">👤</li>

          <li>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          </li>

        </ul>

      </div>


      {/* PRODUCTS SECTION */}

      <div className="products-section">

        <h3>Available Products</h3>

        <div className="product-grid">

          {filteredProducts.length === 0 ? (

            <p>No products found</p>

          ) : (

            filteredProducts.map((product) => {

              const weight = weights[product._id];
              const price = getPriceByWeight(product.price, weight);
              const quantity = counts[product._id];

              return (

                <div key={product._id} className="product-card">

                  <img
                    src={`${IMAGE_URL}${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />

                  <h3>{product.name}</h3>

                  <p>Price: ₹{price}</p>

                  <span className={`category ${product.category.toLowerCase()}`}>
                    {product.category}
                  </span>

                  {/* STOCK */}

                  <span
                    className={`stock-badge ${product.stock
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {product.stock}
                  </span>


                  {/* WEIGHT SELECT */}

                  <select
                    value={weight}
                    onChange={(e) =>
                      handleWeightChange(product._id, e.target.value)
                    }
                  >

                    <option value="250g">250g</option>
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>

                  </select>


                  {/* QUANTITY */}

                  <div className="quantity-controls">

                    <button
                      onClick={() => decreaseQty(product._id)}
                      disabled={product.stock === "Out of Stock"}
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() => increaseQty(product._id)}
                      disabled={product.stock === "Out of Stock"}
                    >
                      +
                    </button>

                  </div>


                  {/* TOTAL PRICE */}

                  <p className="total-price">
                    Total: ₹{price * quantity}
                  </p>


                  {/* ADD TO CART */}

                  <button
                    className={`cart-btn ${
                      product.stock === "Out of Stock" ? "disabled-btn" : ""
                    }`}
                    disabled={product.stock === "Out of Stock"}
                    onClick={() => addToCart(product)}
                  >

                    {product.stock === "Out of Stock"
                      ? "Out of Stock"
                      : "Add to Cart"}

                  </button>

                </div>

              );

            })

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;