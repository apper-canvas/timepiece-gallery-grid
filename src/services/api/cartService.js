// Cart service for managing cart state
class CartService {
  constructor() {
    this.storageKey = "timepiece_gallery_cart";
  }

  // Get cart items from localStorage
  getCartItems() {
    try {
      const cartData = localStorage.getItem(this.storageKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error loading cart data:", error);
      return [];
    }
  }

  // Save cart items to localStorage
  saveCartItems(items) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  }

  // Add item to cart
  addToCart(watch, quantity = 1) {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.watchId === watch.Id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        watchId: watch.Id,
        brand: watch.brand,
        model: watch.model,
        price: watch.price,
        image: watch.images[0],
        quantity: quantity
      });
    }

    this.saveCartItems(cartItems);
    return cartItems;
  }

  // Remove item from cart
  removeFromCart(watchId) {
    const cartItems = this.getCartItems();
    const updatedItems = cartItems.filter(item => item.watchId !== watchId);
    this.saveCartItems(updatedItems);
    return updatedItems;
  }

  // Update item quantity
  updateQuantity(watchId, quantity) {
    const cartItems = this.getCartItems();
    const item = cartItems.find(item => item.watchId === watchId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(watchId);
      } else {
        item.quantity = quantity;
        this.saveCartItems(cartItems);
      }
    }
    
    return cartItems;
  }

  // Clear entire cart
  clearCart() {
    localStorage.removeItem(this.storageKey);
    return [];
  }

  // Get cart summary
  getCartSummary() {
    const items = this.getCartItems();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return {
      items,
      itemCount,
      subtotal,
      tax: subtotal * 0.08,
      shipping: subtotal > 1000 ? 0 : 50,
      total: subtotal + (subtotal * 0.08) + (subtotal > 1000 ? 0 : 50)
    };
  }
}

export default new CartService();