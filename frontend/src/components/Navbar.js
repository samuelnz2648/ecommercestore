// ecommercestore/frontend/src/components/Navbar.js

import React, { useContext } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          eCommerce Store
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart{" "}
                  {cart.items.length > 0 && (
                    <Badge bg="secondary">{cart.items.length}</Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={Link} to="/orders">
                  Orders
                </Nav.Link>
                {user.role === "admin" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
