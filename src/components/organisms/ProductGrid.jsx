import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  watches = [], 
  loading = false, 
  error = null, 
  onAddToCart, 
  onRetry,
  className 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={onRetry}
      />
    );
  }

  if (!watches || watches.length === 0) {
    return (
      <Empty
        title="No watches found"
        message="We couldn't find any watches matching your criteria. Try adjusting your filters or browse our full collection."
        actionLabel="Browse All Watches"
        onAction={() => window.location.href = "/"}
        icon="Search"
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {watches.map((watch) => (
        <ProductCard
          key={watch.Id}
          watch={watch}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;