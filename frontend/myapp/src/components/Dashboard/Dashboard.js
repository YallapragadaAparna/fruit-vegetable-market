import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api,{IMAGE_URL} from "../../services/api";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [weights, setWeights] = useState({});
  const [counts, setCounts] = useState({});

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
  const addToCart = (product) => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const weight = weights[product._id];
    const quantity = counts[product._id];

    const price = getPriceByWeight(product.price, weight);

    const existingProduct = cart.find(
      (item) => item._id === product._id && item.weight === weight
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        ...product,
        weight,
        quantity,
        price
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");

  navigate("/cart");

  };

  return (
    <div>

      {/* HEADER */}

      <div className="dashboard-header">

        <h2 className="logo">Fresh Cart</h2>

        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search fruits or vegetables..."
            className="search-bar"
          />
        </div>

        <ul className="menu">

          <li><Link to="/fruits">Fruits</Link></li>

          <li><Link to="/vegetables">Vegetables</Link></li>

          <li><Link to="/cart">Cart</Link></li>

          <li className="profile-icon">👤</li>

          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>

        </ul>

      </div>


      {/* PRODUCTS SECTION */}

      <div className="products-section">

        <h3>Available Products</h3>

        <div className="product-grid">

          {products.map((product) => {

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

                <p>Category: {product.category}</p>


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

                  <button onClick={() => decreaseQty(product._id)}>
                    -
                  </button>

                  <span>{quantity}</span>

                  <button onClick={() => increaseQty(product._id)}>
                    +
                  </button>

                </div>


                {/* TOTAL PRICE */}

                <p className="total-price">

                  Total: ₹{price * quantity}

                </p>


                {/* ADD TO CART */}

                <button
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;