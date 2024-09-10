// ecommercestore/frontend/src/pages/Checkout.js

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { getCart, createOrder } from "../utils/api";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart();
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cart.CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: cart.CartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice: calculateTotal(),
      };
      const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      navigate(`/order/${response.data.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h2>Loading checkout...</h2>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          Please <Alert.Link href="/login">log in</Alert.Link> to proceed with
          checkout.
        </Alert>
      </Container>
    );
  }

  if (!cart || cart.CartItems.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          Your cart is empty.{" "}
          <Alert.Link href="/products">Continue shopping</Alert.Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <h2>Shipping Information</h2>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="postalCode" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="country" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <h2>Payment Method</h2>
            <Form.Group controlId="paymentMethod" className="mb-3">
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Place Order
            </Button>
          </Form>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            {cart.CartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col>{item.Product.name}</Col>
                  <Col className="text-right">
                    {item.quantity} x ${item.price} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total:</strong>
                </Col>
                <Col className="text-right">
                  <strong>${calculateTotal()}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
