import React,{useState} from "react";
import api from "../services/api";

function Admin(){

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")

const addProduct = ()=>{

api.post("/products",{

name,
price,
image

})
.then(()=>alert("Product Added"))

}

return(

<div style={{padding:"40px"}}>

<h2>Add Product</h2>

<input
placeholder="Product Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Price"
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<input
placeholder="Image URL"
onChange={(e)=>setImage(e.target.value)}
/>

<br/><br/>

<button onClick={addProduct}>
Add Product
</button>

</div>

)

}

export default Admin;