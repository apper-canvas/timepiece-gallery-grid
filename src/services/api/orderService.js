import ordersData from "@/services/mockData/orders.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async createOrder(orderData) {
    await delay(500);
    
    const newOrder = {
      Id: this.getNextId(),
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      orderDate: new Date().toISOString(),
      status: "confirmed",
      orderNumber: this.generateOrderNumber()
    };

    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async getById(id) {
    await delay(200);
    
    const order = this.orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return { ...order };
  }

  async getAll() {
    await delay(300);
    return [...this.orders];
  }

  getNextId() {
    const maxId = this.orders.reduce((max, order) => 
      order.Id > max ? order.Id : max, 0);
    return maxId + 1;
  }

  generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `TG${timestamp.slice(-6)}${random}`;
  }
}

export default new OrderService();