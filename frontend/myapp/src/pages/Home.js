import React,{useEffect,useState} from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import "../App.css";

function Home(){

const [products,setProducts] = useState([])

const addToCart = (product)=>{

alert(product.name+" added to cart")

}

useEffect(()=>{

api.get("/products")
.then(res=>setProducts(res.data))
.catch(err=>console.log(err))

},[])

return(

// <div className="home">

// <h1>Fresh Fruits & Vegetables</h1>

<div className="productGrid">

{products.map((product)=>(
<ProductCard
key={product._id}
product={product}
addToCart={addToCart}
/>
))}

</div>

//</div>

)

}

export default Home;