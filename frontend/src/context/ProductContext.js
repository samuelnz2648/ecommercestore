// ecommercestore/frontend/src/context/ProductContext.js

import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
      toast.error("Error loading products.");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  const addProduct = async (productData) => {
    try {
      const response = await api.addProduct(productData);
      setProducts([...products, response.data]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.updateProduct(id, productData);
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
