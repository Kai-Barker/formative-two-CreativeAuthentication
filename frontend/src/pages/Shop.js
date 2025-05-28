import { Container, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import OutlineButton from "../components/OutlineButton.js";
import "./css/Shop.css";
import ShopItemCard from "../components/ShopItemCard.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Shop() {
  const [displayMaxCount, setDisplayMaxCount] = useState(20);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-submenu">
        <h2 className="shop-title">ALL PRODUCTS</h2>
        <div className="filter-options">
          <div className="filter-button-holder">
            <OutlineButton
              className="filter-button"
              buttonLabel="Shop By Category"
            />
          </div>
          <Typeahead
            className="form-input"
            onChange={() => {}}
            options={["", "", ""]}
            selected=""
            placeholder="Search"
            clearButton={true}
            inputProps={{
              className: "form-text",
            }}
          />
        </div>
      </div>

      <Container id="shop-item-shop-container">
        <Row className="g-4 justify-content-center">
          {products.slice(0, displayMaxCount).map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/product/${product._id}`}>
               
                  <ShopItemCard
                    productImage={product.image}
                    productName={product.productName}
                    productPrice={product.price}
                    productRating={product.rating}
                  />
              
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Shop;
