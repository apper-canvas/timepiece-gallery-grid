import React from "react";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import PriceRange from "@/components/molecules/PriceRange";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isOpen,
  onClose,
  className 
}) => {
  const categories = ["luxury", "sport", "fashion", "smartwatch"];
  const brands = ["Rolex", "Omega", "Seiko", "Casio", "Apple", "Samsung", "TAG Heuer", "Breitling"];

  const handleCategoryChange = (selectedCategories) => {
    onFiltersChange({
      ...filters,
      categories: selectedCategories
    });
  };

  const handlePriceChange = (priceRange) => {
    onFiltersChange({
      ...filters,
      priceRange
    });
  };

  const handleBrandChange = (brand) => {
    const selectedBrands = filters.brands || [];
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    onFiltersChange({
      ...filters,
      brands: newBrands
    });
  };

  const sidebarContent = (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-primary">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-secondary hover:text-accent"
        >
          Clear All
        </Button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categories || []}
        onCategoryChange={handleCategoryChange}
      />

      <PriceRange
        min={0}
        max={50000}
        onPriceChange={handlePriceChange}
      />

      <div>
        <label className="block text-sm font-medium text-primary mb-3">
          Brands
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 text-accent bg-white border-gray-300 rounded focus:ring-accent focus:ring-2"
              />
              <span className="text-sm text-primary">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-80 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="w-80 bg-white h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-primary">Filters</h2>
                <Button
                  variant="ghost"
                  onClick={onClose}
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;