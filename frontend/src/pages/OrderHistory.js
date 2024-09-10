// ecommercestore/frontend/src/pages/OrderHistory.js

import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Alert, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { getUserOrders } from "../utils/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h2>Loading order history...</h2>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          Please{" "}
          <Alert.Link as={Link} to="/login">
            log in
          </Alert.Link>{" "}
          to view your order history.
        </Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          You haven't placed any orders yet.{" "}
          <Alert.Link as={Link} to="/products">
            Start shopping
          </Alert.Link>
        </Alert>
      </Container>
    );
  }

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5">
      <h1 className="mb-4">Order History</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Link to={`/order/${order.id}`}>
                  <Button variant="info" size="sm">
                    View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );
};

export default OrderHistory;
