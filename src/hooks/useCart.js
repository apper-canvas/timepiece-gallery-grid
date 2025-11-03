import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cartService from "@/services/api/cartService";

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
      toast.success(`${watch.brand} ${watch.model} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

const removeFromCart = (watchId) => {
    try {
      const updatedItems = cartService.removeFromCart(watchId);
      setCartItems(updatedItems);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    }
  };

const updateQuantity = (watchId, quantity) => {
    try {
      const updatedItems = cartService.updateQuantity(watchId, quantity);
      setCartItems(updatedItems);
      // toast.success("Cart updated"); // Optional: Less intrusive for quantity changes
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };
const clearCart = () => {
    try {
      const updatedItems = cartService.clearCart();
      setCartItems(updatedItems);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.");
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