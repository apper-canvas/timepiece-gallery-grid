import { getApperClient } from "@/services/apperClient";

// Simulate API delay for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  async createOrder(orderData) {
    await delay(500);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      // Generate order number
      const orderNumber = this.generateOrderNumber();
      
      const params = {
        records: [
          {
            Name: `Order ${orderNumber}`,
            items_c: JSON.stringify(orderData.items),
            total_amount_c: orderData.totalAmount,
            shipping_address_c: JSON.stringify(orderData.shippingAddress),
            payment_method_c: orderData.paymentMethod,
            order_date_c: new Date().toISOString(),
            status_c: "confirmed",
            order_number_c: orderNumber
          }
        ]
      };

      const response = await apperClient.createRecord('order_c', params);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to create order");
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return this.transformOrderData(result.data);
        } else {
          throw new Error(result.message || "Order creation failed");
        }
      }

      throw new Error("No order data returned");
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async getById(id) {
    await delay(200);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "payment_method_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "order_number_c"}}
        ]
      };

      const response = await apperClient.getRecordById('order_c', parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message || `Order with ID ${id} not found`);
      }

      return this.transformOrderData(response.data);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  }

  async getAll() {
    await delay(300);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "payment_method_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "order_number_c"}}
        ],
        orderBy: [{"fieldName": "order_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('order_c', params);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch orders");
      }

      return response.data.map(order => this.transformOrderData(order));
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `TG${timestamp.slice(-6)}${random}`;
  }

  // Transform database fields to UI format
  transformOrderData(orderData) {
    let items = [];
    let shippingAddress = {};

    try {
      items = orderData.items_c ? JSON.parse(orderData.items_c) : [];
    } catch (error) {
      console.error("Error parsing order items:", error);
      items = [];
    }

    try {
      shippingAddress = orderData.shipping_address_c ? JSON.parse(orderData.shipping_address_c) : {};
    } catch (error) {
      console.error("Error parsing shipping address:", error);
      shippingAddress = {};
    }

    return {
      Id: orderData.Id,
      items: items,
      totalAmount: parseFloat(orderData.total_amount_c) || 0,
      shippingAddress: shippingAddress,
      paymentMethod: orderData.payment_method_c || '',
      orderDate: orderData.order_date_c || new Date().toISOString(),
      status: orderData.status_c || 'pending',
      orderNumber: orderData.order_number_c || ''
    };
  }
}

export default new OrderService();