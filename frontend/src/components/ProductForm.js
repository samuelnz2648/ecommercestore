// ecommercestore/frontend/src/components/ProductForm.js

import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, getProductById } =
    useContext(ProductContext);
  const [error, setError] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(id);
          setProduct(productData);
        } catch (error) {
          setError("Failed to fetch product details.");
        }
      };
      fetchProduct();
    }
  }, [id, getProductById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await addProduct(product);
      }
      navigate("/admin");
    } catch (error) {
      setError("Failed to save product. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {id ? "Update Product" : "Add Product"}
      </Button>
    </Form>
  );
};

export default ProductForm;
