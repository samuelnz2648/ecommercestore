// ecommercestore/frontend/src/context/OrderContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.getOrders();
      setOrders(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again later.");
      toast.error("Error loading orders.");
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      setLoading(true);
      const response = await api.getOrderById(orderId);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Failed to fetch order details. Please try again later.");
      toast.error("Error loading order details.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const response = await api.createOrder(orderData);
      setOrders([...orders, response.data]);
      toast.success("Order placed successfully!");
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      const response = await api.updateOrderStatus(orderId, status);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      toast.success("Order status updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        getOrderById,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
