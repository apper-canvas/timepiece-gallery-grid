import React, { useState, useEffect } from "react";

const PriceRange = ({ onPriceChange, min = 0, max = 10000, className }) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onPriceChange({ min: minPrice, max: maxPrice });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-primary mb-3">
        Price Range
      </label>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-secondary mb-1">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 bg-white"
              min={min}
              max={max}
            />
          </div>
          <div>
            <label className="block text-xs text-secondary mb-1">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 bg-white"
              min={min}
              max={max}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <input
            type="range"
            min={min}
            max={max}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #c9a96e 0%, #c9a96e ${(minPrice / max) * 100}%, #e5e7eb ${(minPrice / max) * 100}%, #e5e7eb 100%)`
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(maxPrice / max) * 100}%, #c9a96e ${(maxPrice / max) * 100}%, #c9a96e 100%)`
            }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-secondary">
          <span>${minPrice.toLocaleString()}</span>
          <span>${maxPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;