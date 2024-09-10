// ecommercestore/frontend/src/pages/OrderConfirmationPage.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderById } from "../utils/api";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h2>Loading order details...</h2>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          Order not found. Please check your order number and try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Alert variant="success">
        <Alert.Heading>Thank you for your order!</Alert.Heading>
        <p>Your order has been successfully placed and is being processed.</p>
      </Alert>

      <Card className="my-4">
        <Card.Header>
          <h2>Order #{order.id}</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h3>Shipping Information</h3>
              <p>
                {order.shippingAddress.address}, <br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}{" "}
                <br />
                {order.shippingAddress.country}
              </p>
            </Col>
            <Col md={6}>
              <h3>Order Summary</h3>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()} <br />
                <strong>Order Status:</strong> {order.status} <br />
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
            </Col>
          </Row>

          <h3 className="mt-4">Order Items</h3>
          <ListGroup variant="flush">
            {order.OrderItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={6}>{item.Product.name}</Col>
                  <Col md={2}>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </Col>
                  <Col md={4} className="text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row className="mt-4">
            <Col md={6}>
              <h4>Subtotal:</h4>
              <h4>Shipping:</h4>
              <h4>Tax:</h4>
              <h3>Total:</h3>
            </Col>
            <Col md={6} className="text-right">
              <h4>${order.itemsPrice.toFixed(2)}</h4>
              <h4>${order.shippingPrice.toFixed(2)}</h4>
              <h4>${order.taxPrice.toFixed(2)}</h4>
              <h3>${order.totalPrice.toFixed(2)}</h3>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="text-center mt-4">
        <Link to="/products" className="btn btn-primary mr-3">
          Continue Shopping
        </Link>
        <Link to="/orders" className="btn btn-secondary">
          View All Orders
        </Link>
      </div>
    </Container>
  );
};

export default OrderConfirmation;
