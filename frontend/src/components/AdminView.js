import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import placeholder from "../assets/images/call-to-action.jpg";
import "./css/AdminView.css"; // New CSS for admin-specific styles
import RatingDisplay from "../components/RatingDisplay";
import axios from "axios";

const AdminView = ({id}) => {
  const [productName, setProductName] = useState("Her little Glock 18");
  const [vendor, setVendor] = useState("Baby Girl Defense Systems LTD");
  const [rating, setRating] = useState(3.5);
  const [description, setDescription] = useState(
    "The perfect self defense tool for the little lady in your life.\nSelect fire with semi-auto and fully automatic modes.\nBeautiful faceted jewels"
  );
  const [price, setPrice] = useState("149.99");
  const [image, setImage] = useState("");
  const [productID, setProductId] = useState("")

  // TODO: Link to MongoDB
  // TODO: Fetch product image
  // TODO: Add Save/Update logic


  //button states flag- ou6t of stock
  const [isFlagged, setIsFlagged] = useState(false);  // flag state (What is flag state?)
  const [outOfStock, setOutOfStock] = useState(false); // out of stock toggle state

// Handler to toggle flagged state
const handleDelete = async(e) => {
  console.log("deleting product...");
  
  try {
    const res = await axios.delete(`http://localhost:5000/api/products/delete/${id}`)
    console.log("Product deleted"+ res.data);
     
  } catch (error) {
    console.log("Error deleting product");
    
  }
};

// Handler to toggle outOfStock state
const handleStockChange = (e) => {
  setOutOfStock(e.target.checked);
};
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

const handleUpdate = async(e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:5000/api/products/update/${id}`, {
    productName,
    description,
    price,
    rating,
    vendor,
  }); //Replace the id with this products id
    console.log(res);
    console.log("Successfully updated product");
    
    
  } catch (error) {
    
  }
}
  useEffect(() => {
    // Example: fetch product details from API and set state
    const fetchProduct = async () => {
      console.log(id);
      try {
        // Replace with actual product ID or prop
        
        const productId = id;
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const data = res.data;

        setProductName(data.productName || "");
        setVendor(data.vendor || "");
        setRating(data.rating || 0);
        setDescription(data.description || "");
        setPrice(data.price || "");
        setImage(data.image || "");
        setProductId(data._id || "");
        setOutOfStock(data.outOfStock || false);
        setIsFlagged(data.isFlagged || false);
      } catch (error) {
        console.log("Error fetching product details to edit", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="admin-container">
      <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
        <Row className="admin-product-row">
          <Col md={6} lg={6} className="admin-image-col">
            <img src={image} alt="Product" className="admin-image" />
          </Col>
          <Col md={{ span: 5, offset: 1 }} className="admin-form-col">
            <div className="admin-form-wrapper">
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formProductName">
                  <Form.Label className="admin-label">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group controlId="formVendor">
                  <Form.Label className="admin-label">Vendor</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group controlId="formRating">
                  <Form.Label className="admin-label">Rating</Form.Label>
                  <RatingDisplay value={rating} onChange={(e, newRating) => setRating(newRating)} readOnly={false}/>
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label className="admin-label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label className="admin-label">Price (R)</Form.Label>
                  <Form.Control
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>


  <div className="admin-button-group">

  {/* Flag Product button styled similarly but with red outline/danger */}
  <Button
    variant={isFlagged ? "danger" : "outline-danger"}
    className="admin-flag-button"
    onClick={handleDelete}
  >
    {isFlagged ? "Flagged" : "Flag Product"}
  </Button>
</div>


<Form.Group controlId="formStock" className="admin-toggle-group">
  <Form.Label className="admin-label">Out of Stock</Form.Label>
  
  {/* Toggle switch */}
  <label className="admin-toggle-switch">
    <input
      type="checkbox"
      checked={outOfStock}
      onChange={handleStockChange}
    />
    <span className="admin-slider" />
  </label>
</Form.Group>


                <Button variant="outline-warning" className="admin-submit-button" type="submit">
                  Save Changes
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminView;
