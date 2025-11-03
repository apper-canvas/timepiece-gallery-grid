import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useWatch, useRelatedWatches } from "@/hooks/useWatches";

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { watch, loading, error, retry } = useWatch(id);
  const { watches: relatedWatches, loading: relatedLoading } = useRelatedWatches(id, 4);

  // Preload images to prevent blinking/flashing
  useEffect(() => {
    if (watch?.images) {
      watch.images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [watch]);

  const handleImageSelect = (index) => {
    if (index === selectedImageIndex) return;
    
    setImageLoading(true);
    // Small delay to show smooth transition
    setTimeout(() => {
      setSelectedImageIndex(index);
      setImageLoading(false);
    }, 150);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message="Watch not found" />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(watch, quantity);
  };

  const handleBuyNow = () => {
    onAddToCart(watch, quantity);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate("/")}
              className="text-secondary hover:text-accent transition-colors duration-200"
            >
              Home
            </button>
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-secondary" />
            <button 
              onClick={() => navigate(`/category/${watch.category}`)}
              className="text-secondary hover:text-accent transition-colors duration-200 capitalize"
            >
              {watch.category}
            </button>
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-secondary" />
            <span className="text-primary font-medium">
              {watch.brand} {watch.model}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
<div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden relative">
              <div className={`absolute inset-0 transition-opacity duration-300 ${imageLoading ? 'opacity-50' : 'opacity-100'}`}>
                <img
                  key={`main-image-${selectedImageIndex}`}
                  src={watch.images[selectedImageIndex]}
                  alt={`${watch.brand} ${watch.model}`}
                  className="w-full h-full object-cover transition-all duration-300"
                  onLoad={() => setImageLoading(false)}
                />
              </div>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              )}
            </div>
            
            {watch.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {watch.images.map((image, index) => (
                  <button
                    key={`thumb-${index}-${image}`}
                    onClick={() => handleImageSelect(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? "border-accent shadow-md" 
                        : "border-gray-200 hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {watch.category}
                </Badge>
                {!watch.inStock && (
                  <Badge variant="error">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                {watch.brand}
              </h1>
              <h2 className="text-xl text-secondary mb-4">
                {watch.model}
              </h2>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-3xl font-bold text-accent">
                  ${watch.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Key Specifications */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-secondary">Movement</p>
                  <p className="font-medium text-primary">{watch.movement}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Circle" className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-secondary">Case Size</p>
                  <p className="font-medium text-primary">{watch.caseSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-secondary">Water Resistance</p>
                  <p className="font-medium text-primary">{watch.waterResistance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Gem" className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-secondary">Material</p>
                  <p className="font-medium text-primary">{watch.caseMaterial}</p>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                    disabled={quantity <= 1}
                  >
                    <ApperIcon name="Minus" className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!watch.inStock}
                  leftIcon="ShoppingCart"
                  className="flex-1"
                >
                  {watch.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={!watch.inStock}
                  rightIcon="ArrowRight"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="font-display text-xl font-semibold text-primary mb-3">
                About This Watch
              </h3>
              <p className="text-secondary leading-relaxed">
                {watch.description}
              </p>
            </div>

            {/* Detailed Specifications */}
            {watch.specifications && (
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="font-display text-xl font-semibold text-primary mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(watch.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-secondary capitalize font-medium">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedWatches && relatedWatches.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-primary mb-8">
              You Might Also Like
            </h2>
            <ProductGrid
              watches={relatedWatches}
              loading={relatedLoading}
              onAddToCart={onAddToCart}
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;