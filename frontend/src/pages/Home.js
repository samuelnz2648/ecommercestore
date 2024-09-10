// ecommercestore/frontend/src/pages/Home.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts } from "../utils/api";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await getProducts();
        // Assuming the API returns all products, we'll select the first 3 as featured
        setFeaturedProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h1>Welcome to Our eCommerce Store</h1>
          <p className="lead">
            Discover amazing products at great prices. Start shopping now!
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Browse All Products
            </Button>
          </Link>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Featured Products</h2>
      <Carousel>
        {featuredProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.name}
              style={{ objectFit: "cover", height: "400px" }}
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/product/${product.id}`}>
                <Button variant="light">View Details</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Wide Selection</Card.Title>
              <Card.Text>
                Browse through our extensive catalog of high-quality products.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Great Prices</Card.Title>
              <Card.Text>
                Enjoy competitive prices and regular discounts on our products.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Fast Shipping</Card.Title>
              <Card.Text>
                Get your orders quickly with our efficient shipping process.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
