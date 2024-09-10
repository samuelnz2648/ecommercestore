// ecommercestore/frontend/src/components/Footer.js

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="py-4">
        <Row>
          <Col md={4}>
            <h5>eCommerce Store</h5>
            <p>Your one-stop shop for all your needs.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-light">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-light">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-light">
                  Orders
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              123 eCommerce St.
              <br />
              Shopping City, SC 12345
              <br />
              <a href="mailto:info@ecommercestore.com" className="text-light">
                info@ecommercestore.com
              </a>
              <br />
              <a href="tel:+1234567890" className="text-light">
                (123) 456-7890
              </a>
            </address>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} eCommerce Store. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
