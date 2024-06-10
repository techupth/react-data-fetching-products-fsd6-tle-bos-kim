import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [post, setPost] = useState("load");

  const dataServer = async () => {
    try {
      const getData = await axios.get("http://localhost:4001/products");
      setPost(getData.data.data);
      console.log(1);
    } catch (error) {
      setPost("Fetching Error...");
    }
  };

  const handleClick = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`);
    const deleteDataWeb = post.filter((item) => {
      return index !== item.id;
    });
    setPost(deleteDataWeb);
  };

  useEffect(() => {
    dataServer();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">
          {post !== "load" ? (
            post === "Fetching Error..." ? (
              <div>Fetching Error...</div>
            ) : (
              "Products"
            )
          ) : (
            ""
          )}
        </h1>
      </div>
      <div className="product-list">
        {post !== "load" ? (
          post === "Fetching Error..." ? (
            ""
          ) : (
            post.map((eachPost, index) => {
              return (
                <div className="product" key={index}>
                  <div className="product-preview">
                    <img
                      src={eachPost.image}
                      alt="some product"
                      width="350"
                      height="350"
                    />
                  </div>
                  <div className="product-detail">
                    <h1>Product name: {eachPost.name}</h1>
                    <h2>Product price: {eachPost.price} Baht</h2>
                    <p>Product description: {eachPost.description}</p>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => {
                      handleClick(eachPost.id);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default App;
