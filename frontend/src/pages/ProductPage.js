// ecommercestore/frontend/src/pages/ProductPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { getProduct } from "../utils/api";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    // TODO: Implement actual add to cart functionality
    toast.success(`Added ${quantity} ${product.name}(s) to cart`);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h2>Loading product...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <p>{product.description}</p>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
