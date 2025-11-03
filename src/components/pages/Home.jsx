import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useWatches, useFeaturedWatches } from "@/hooks/useWatches";

const Home = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("all");
  
  const { watches, loading, error, filters, updateFilters, clearFilters, retry } = useWatches();
  const { watches: featuredWatches, loading: featuredLoading } = useFeaturedWatches(4);

  const categories = [
    { id: "all", label: "All Watches", count: watches.length },
    { id: "luxury", label: "Luxury", count: watches.filter(w => w.category === "luxury").length },
    { id: "sport", label: "Sport", count: watches.filter(w => w.category === "sport").length },
    { id: "fashion", label: "Fashion", count: watches.filter(w => w.category === "fashion").length },
    { id: "smartwatch", label: "Smartwatch", count: watches.filter(w => w.category === "smartwatch").length }
  ];

  const handleCategoryFilter = (category) => {
    setActiveSection(category);
    if (category === "all") {
      updateFilters({ categories: [] });
    } else {
      updateFilters({ categories: [category] });
    }
  };

  const displayedWatches = activeSection === "all" ? watches : watches.filter(w => w.category === activeSection);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Perfect Timepiece
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore our curated collection of luxury, sport, and smartwatches from the world's finest brands. Every timepiece tells a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => document.getElementById("featured").scrollIntoView({ behavior: "smooth" })}
                rightIcon="ArrowDown"
              >
                Explore Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/category/luxury")}
              >
                View Luxury Watches
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
      </section>

      {/* Featured Watches */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Timepieces
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Discover our most coveted watches, chosen for their exceptional craftsmanship and timeless appeal.
            </p>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
                  <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2"></div>
                    <div className="h-5 bg-gradient-to-r from-accent/30 to-accent/20 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid 
              watches={featuredWatches}
              onAddToCart={onAddToCart}
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            />
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Browse by Category
            </h2>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              leftIcon="Filter"
              className="lg:hidden"
            >
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeSection === category.id ? "primary" : "outline"}
                onClick={() => handleCategoryFilter(category.id)}
                className="flex items-center gap-2"
              >
                {category.label}
                <Badge variant={activeSection === category.id ? "secondary" : "default"}>
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid with Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <FilterSidebar
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary">
                    {activeSection === "all" ? "All Watches" : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Watches`}
                  </h3>
                  <p className="text-secondary">
                    {displayedWatches.length} {displayedWatches.length === 1 ? "watch" : "watches"} found
                  </p>
                </div>

                {(filters.categories?.length > 0 || filters.brands?.length > 0 || filters.priceRange) && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    leftIcon="X"
                    className="text-secondary hover:text-accent"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <ProductGrid
                watches={displayedWatches}
                loading={loading}
                error={error}
                onAddToCart={onAddToCart}
                onRetry={retry}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Stay Updated with New Arrivals
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to discover our latest timepieces and exclusive collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;