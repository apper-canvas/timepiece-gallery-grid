import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ watch, onAddToCart, className }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${watch.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(watch);
  };

  return (
<div 
      className={`bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer card-hover group ${className}`}
      onClick={() => navigate(`/product/${watch.Id}`)}
      style={{ willChange: 'transform, box-shadow' }}
    >
      <div className="relative overflow-hidden">
        <img
          src={watch.images[0]}
          alt={`${watch.brand} ${watch.model}`}
          className="w-full h-64 object-cover image-zoom"
          style={{ willChange: 'transform' }}
        />
        
        {!watch.inStock && (
          <div className="absolute top-3 left-3">
            <Badge variant="error">Out of Stock</Badge>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">{watch.category}</Badge>
        </div>
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
            <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-display text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-200">
            {watch.brand}
          </h3>
          <p className="text-secondary text-sm">{watch.model}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-xl font-bold text-accent">
              ${watch.price.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center text-xs text-secondary space-x-4">
            <span className="flex items-center gap-1">
              <ApperIcon name="Clock" className="w-3 h-3" />
              {watch.movement}
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Circle" className="w-3 h-3" />
              {watch.caseSize}
            </span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          disabled={!watch.inStock}
          className="w-full"
          leftIcon="ShoppingCart"
        >
          {watch.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;