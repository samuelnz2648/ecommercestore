// ecommercestore/frontend/src/pages/ProductListing.js

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../utils/api";
import { UserContext } from "../context/UserContext";
import ProductForm from "../components/ProductForm";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleProductSaved = () => {
    handleCloseModal();
    fetchProducts();
  };

  if (loading) {
    return (
      <Container>
        <h2>Loading products...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Our Products</h1>
      {user && user.role === "admin" && (
        <Button variant="success" onClick={handleAddProduct} className="mb-3">
          Add New Product
        </Button>
      )}
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Link to={`/product/${product.id}`}>
                <Card.Img src={product.image} variant="top" />
              </Link>
              <Card.Body>
                <Link to={`/product/${product.id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="h3">${product.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => toast.info(`${product.name} added to cart!`)}
                >
                  Add to Cart
                </Button>
                {user && user.role === "admin" && (
                  <div className="mt-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            product={editingProduct}
            onSave={handleProductSaved}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductListing;
