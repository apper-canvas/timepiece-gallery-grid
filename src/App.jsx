import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Cart from "@/components/organisms/Cart";
import Home from "@/components/pages/Home";
import ProductDetail from "@/components/pages/ProductDetail";
import CategoryPage from "@/components/pages/CategoryPage";
import Checkout from "@/components/pages/Checkout";
import OrderConfirmation from "@/components/pages/OrderConfirmation";
import { useCart } from "@/hooks/useCart";

function App() {
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

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header
          cartItemCount={getItemCount()}
          onSearch={handleSearch}
          onCartClick={openCart}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/category/:category" element={<CategoryPage onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;