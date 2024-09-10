// ecommercestore/frontend/src/pages/Cart.js

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { getCart, updateCartItem, removeFromCart } from "../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart();
        setCartItems(response.data.CartItems || []);
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

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h2>Loading cart...</h2>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="my-5 text-center">
        <h2>Please log in to view your cart</h2>
        <Link to="/login">
          <Button variant="primary" className="mt-3">
            Log In
          </Button>
        </Link>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/products">
          <Button variant="primary" className="mt-3">
            Continue Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Your Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.Product.image}
                      alt={item.Product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.Product.id}`}>
                      {item.Product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              ${calculateTotal()}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
