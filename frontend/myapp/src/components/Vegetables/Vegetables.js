import React, { useEffect, useState } from "react";
import api, { IMAGE_URL } from "../../services/api";
import "./Vegetables.css";

function Vegetables() {

  const [vegetables, setVegetables] = useState([]);

  const fetchVegetables = async () => {
    try {

      const res = await api.get("/products");

      const vegProducts = res.data.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase().includes("vegetable")
      );

      setVegetables(vegProducts);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVegetables();
  }, []);

  return (
    <div className="vegetables-container">

      <h2 className="vegetables-title">Fresh Vegetables</h2>
      <h2>Vegetables</h2>

      <div className="product-grid">

        {vegetables.length === 0 ? (
          <p>No vegetables available</p>
        ) : (
          vegetables.map((product) => (

            <div key={product._id} className="product-card">

              <img
                src={`${IMAGE_URL}${product.image}`}
                alt={product.name}
                className="product-image"
              />

              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>


              {/* <p className="product-card">₹{product.price}</p> */}

             {/* <span className="category-badge">
                {product.category}
              </span> */}

              {/* <button className="veg-cart-btn">
                Add to Cart
              </button> */}

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Vegetables;