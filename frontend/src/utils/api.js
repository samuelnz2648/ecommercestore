// ecommercestore/frontend/src/utils/api.js

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const login = (credentials) => api.post("/users/login", credentials);
export const register = (userData) => api.post("/users/register", userData);
export const getCart = () => api.get("/cart");
export const addToCart = (productId, quantity) =>
  api.post("/cart/add", { productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  api.put(`/cart/update/${itemId}`, { quantity });
export const removeFromCart = (itemId) => api.delete(`/cart/remove/${itemId}`);
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getOrders = () => api.get("/orders");

export default api;
