import React from "react";

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange, className }) => {
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-primary mb-3">
        Categories
      </label>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className="w-4 h-4 text-accent bg-white border-gray-300 rounded focus:ring-accent focus:ring-2"
            />
            <span className="text-sm text-primary capitalize">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;