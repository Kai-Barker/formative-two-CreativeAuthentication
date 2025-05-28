import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";



function ProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [vendor, setVendor] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [productId, setProductId] = useState([]);
  const [productImage, setProductImage] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        productName,
        description,
        price: parseFloat(price),
        image,
        rating: parseFloat(rating),
        vendor,
        type,
      });

      const res = await axios.post(
        "http://localhost:5000/api/products/register",
        {
          productName,
          description,
          price: parseFloat(price),
          image,
          rating: parseFloat(rating),
          vendor,
          type,
        }
      );
      setMessage("Product added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage("Failed to add product.");
    }
  };

  const fetchProducts = async () =>{
    try {
      console.log("Fetching product IDs...");
      
      const res = await axios.get("http://localhost:5000/api/products");
      console.log("fetched!");
      
      const ids = res.data.map(product => product._id);
      const dataImages = res.data.map(product => product.image);
      setProductId(ids);
      setProductImage(dataImages);
    } catch (error) {
      console.error("Error fetching product IDs:", error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create a Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <br />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "100px", marginTop: "10px" }}
          />
        )}
        <br />

        <input
          type="number"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
          step="0.1"
          required
        />
        <br />

        <input
          type="text"
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        />
        <br />

        <input
          type="text"
          placeholder="Type (e.g., product or service)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <br />

        <button type="submit">Submit Product</button>
      </form>

      {message && <p>{message}</p>}
      <div>
        <h3>Existing Product IDs</h3>
        <ul>
          {productId.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
        {/* src={`data:image/jpeg;base64,${product.image}`} */}
      </div>
      <div>
        <h3>Existing Product Images</h3>
        <ul>
          {productImage.map((image, index) => (
            <li key={index}>
              <img src={`data:image/jpeg;base64,${image}`} alt={`Product ${index}`} />
              <img src={image} />
            </li>
          ))}
        </ul>
      </div>

          

    </div>
  );
}

export default ProductForm;
