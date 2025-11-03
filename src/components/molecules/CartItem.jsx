import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, className }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(item.watchId, newQuantity);
    }
  };

  return (
    <div className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <img
        src={item.image}
        alt={`${item.brand} ${item.model}`}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-primary truncate">
          {item.brand} {item.model}
        </h4>
        <p className="text-sm text-secondary">
          ${item.price.toLocaleString()} each
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <ApperIcon name="Minus" className="w-3 h-3" />
        </Button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <ApperIcon name="Plus" className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="text-right min-w-0">
        <p className="font-semibold text-accent">
          ${(item.price * item.quantity).toLocaleString()}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveItem(item.watchId)}
          className="text-error hover:text-error/80 p-1 mt-1"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;