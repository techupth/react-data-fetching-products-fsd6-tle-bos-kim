import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";


function App() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
  const fetchProducts = async () => {
    try {
    const responseData = await axios.get("http://localhost:4001/products");
    setProducts(responseData.data.data);
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
  };
  
  fetchProducts();
}, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error("error deleting product: ", error);
    }
  };

return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
        <div className="product" key={product.id}>
          <div className="product-preview">
            <img
              src={product.image}
              alt={product.name}
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {product.name}</h1>
            <h2>Product price: {product.price} Baht</h2>
            <p>Product description: {product.description}</p>
          </div>

          <button className="delete-button" onClick={() => deleteProduct(product.id)}>x</button>
        </div>
        ))};
      </div>
    </div>
  );
}

export default App;
