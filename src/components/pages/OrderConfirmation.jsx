import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import orderService from "@/services/api/orderService";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderNumber = location.state?.orderNumber;

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const orderData = await orderService.getById(orderId);
        setOrder(orderData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error && !orderNumber) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="CheckCircle" className="w-10 h-10 text-success" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-secondary mb-6 max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been successfully placed and you will receive a confirmation email shortly.
          </p>

          {(orderNumber || order?.orderNumber) && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg font-medium">
              <ApperIcon name="Hash" className="w-4 h-4" />
              Order Number: {orderNumber || order.orderNumber}
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-display text-xl font-semibold text-primary mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.watchId} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-primary">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-sm text-secondary">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-secondary">
                        ${item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-primary">Total Amount</span>
                  <span className="text-accent">${order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-display text-lg font-semibold text-primary mb-4">
                  Shipping Address
                </h3>
                <div className="text-sm text-secondary space-y-1">
                  <p className="font-medium text-primary">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p className="pt-2">{order.shippingAddress.email}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-display text-lg font-semibold text-primary mb-4">
                  Order Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Order Date</span>
                    <span className="text-primary">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Payment Method</span>
                    <span className="text-primary capitalize">
                      {order.paymentMethod.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Status</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={() => navigate("/")}
              rightIcon="ArrowRight"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              leftIcon="Download"
            >
              Print Receipt
            </Button>
          </div>
          
          <p className="text-sm text-secondary max-w-lg mx-auto">
            You will receive an email confirmation with tracking information once your order ships. 
            Expected delivery is 3-5 business days for standard shipping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;