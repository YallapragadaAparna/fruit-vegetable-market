import React, { useEffect, useState } from "react";
import api, { IMAGE_URL } from "../../services/api";
import "./Fruits.css";
function Fruits() {

  const [fruits, setFruits] = useState([]);

  const fetchFruits = async () => {
    try {

      const res = await api.get("/products");

      const fruitProducts = res.data.filter(
        (product) => product.category.toLowerCase().includes("fruit")
      );

      setFruits(fruitProducts);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  return (

    <div  className="fruits-container">

<h2 className="fruits-title">Fresh Fruits</h2>

      <h2>Fruits</h2>

      <div className="product-grid">

        {fruits.map((product) => (

          <div key={product._id} className="product-card">

            <img
              src={`${IMAGE_URL}${product.image}`}
              alt={product.name}
              className="product-image"
            />

            <h3>{product.name}</h3>

            <p>Price: ₹{product.price}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Fruits;