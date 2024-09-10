// ecommercestore/frontend/src/context/CartContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // If user logs out, clear the cart
      setCart({ items: [], total: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.getCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await api.addToCart(productId, quantity);
      setCart(response.data);
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await api.updateCartItem(itemId, quantity);
      setCart(response.data);
      toast.success("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await api.removeFromCart(itemId);
      fetchCart(); // Refetch the cart to get the updated state
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await api.clearCart();
      setCart({ items: [], total: 0 });
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
