// ecommercestore/frontend/src/pages/Login.js

import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </Container>
  );
};

export default Login;
