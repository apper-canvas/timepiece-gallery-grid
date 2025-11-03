import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import watchService from "@/services/api/watchService";

const CategoryPage = ({ onAddToCart }) => {
  const { category } = useParams();
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ categories: [category] });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const loadWatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await watchService.getAll(filters);
      setWatches(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading watches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilters({ categories: [category] });
  }, [category]);

  useEffect(() => {
    loadWatches();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...newFilters, categories: [category] });
  };

  const handleClearFilters = () => {
    setFilters({ categories: [category] });
  };

  const getCategoryTitle = () => {
    return category.charAt(0).toUpperCase() + category.slice(1) + " Watches";
  };

  const getCategoryDescription = () => {
    const descriptions = {
      luxury: "Discover exceptional timepieces from the world's most prestigious watchmakers. Each luxury watch represents decades of craftsmanship and heritage.",
      sport: "Built for performance and adventure. Our sport watches combine durability with precision for active lifestyles and extreme conditions.",
      fashion: "Contemporary designs that complement your personal style. Fashion watches that blend aesthetics with functionality for everyday elegance.",
      smartwatch: "The future of timekeeping. Advanced smartwatches with cutting-edge technology for the modern, connected lifestyle."
    };
    return descriptions[category] || "Explore our curated collection of timepieces.";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {getCategoryDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">
              {getCategoryTitle()}
            </h2>
            <p className="text-secondary">
              {watches.length} {watches.length === 1 ? "watch" : "watches"} found
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            leftIcon="Filter"
            className="lg:hidden"
          >
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          <div className="flex-1">
            <ProductGrid
              watches={watches}
              loading={loading}
              error={error}
              onAddToCart={onAddToCart}
              onRetry={loadWatches}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;