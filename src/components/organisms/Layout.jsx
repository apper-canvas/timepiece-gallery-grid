import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Cart from "@/components/organisms/Cart";
import { useCart } from "@/hooks/useCart";

function Layout() {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getItemCount,
    isCartOpen, 
    openCart, 
    closeCart 
  } = useCart();

  const handleSearch = (searchTerm) => {
    // Search functionality would be handled in the Home component
    console.log("Searching for:", searchTerm);
  };

  // Context to pass to all child routes
  const outletContext = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemCount,
    isCartOpen,
    openCart,
    closeCart,
    handleSearch,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={getItemCount()}
        onSearch={handleSearch}
        onCartClick={openCart}
      />
      
      <main>
        <Outlet context={outletContext} />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default Layout;