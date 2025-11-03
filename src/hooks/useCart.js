import { useState, useEffect } from "react";
import cartService from "@/services/api/cartService";
import { toast } from "react-toastify";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const items = cartService.getCartItems();
    setCartItems(items);
  }, []);

  const addToCart = (watch, quantity = 1) => {
    try {
      const updatedItems = cartService.addToCart(watch, quantity);
      setCartItems(updatedItems);
      toast.success(`${watch.brand} ${watch.model} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = (watchId) => {
    try {
      const updatedItems = cartService.removeFromCart(watchId);
      setCartItems(updatedItems);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Remove from cart error:", error);
    }
  };

  const updateQuantity = (watchId, quantity) => {
    try {
      const updatedItems = cartService.updateQuantity(watchId, quantity);
      setCartItems(updatedItems);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  const clearCart = () => {
    try {
      const updatedItems = cartService.clearCart();
      setCartItems(updatedItems);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Clear cart error:", error);
    }
  };

  const getCartSummary = () => {
    return cartService.getCartSummary();
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSummary,
    getItemCount,
    isCartOpen,
    openCart,
    closeCart
  };
};