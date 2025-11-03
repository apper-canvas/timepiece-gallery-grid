import watchesData from "@/services/mockData/watches.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WatchService {
  constructor() {
    this.watches = [...watchesData];
  }

  async getAll(filters = {}) {
    await delay(300);
    
    let filteredWatches = [...this.watches];

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredWatches = filteredWatches.filter(watch => 
        filters.categories.includes(watch.category)
      );
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filteredWatches = filteredWatches.filter(watch => 
        filters.brands.includes(watch.brand)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      filteredWatches = filteredWatches.filter(watch => 
        watch.price >= min && watch.price <= max
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredWatches = filteredWatches.filter(watch => 
        watch.brand.toLowerCase().includes(searchTerm) ||
        watch.model.toLowerCase().includes(searchTerm) ||
        watch.category.toLowerCase().includes(searchTerm)
      );
    }

    return filteredWatches;
  }

  async getById(id) {
    await delay(200);
    
    const watch = this.watches.find(w => w.Id === parseInt(id));
    if (!watch) {
      throw new Error(`Watch with ID ${id} not found`);
    }
    return { ...watch };
  }

  async getByCategory(category) {
    await delay(250);
    
    const filteredWatches = this.watches.filter(watch => 
      watch.category.toLowerCase() === category.toLowerCase()
    );
    return filteredWatches;
  }

  async getFeatured(limit = 4) {
    await delay(200);
    
    // Return highest priced watches as featured
    const featured = [...this.watches]
      .sort((a, b) => b.price - a.price)
      .slice(0, limit);
    
    return featured;
  }

  async searchWatches(query) {
    await delay(250);
    
    if (!query || query.trim() === "") {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = this.watches.filter(watch => 
      watch.brand.toLowerCase().includes(searchTerm) ||
      watch.model.toLowerCase().includes(searchTerm) ||
      watch.category.toLowerCase().includes(searchTerm) ||
      watch.description.toLowerCase().includes(searchTerm)
    );

    return results;
  }

  // Get related watches (same category, different brand)
  async getRelated(watchId, limit = 4) {
    await delay(200);
    
    const currentWatch = this.watches.find(w => w.Id === parseInt(watchId));
    if (!currentWatch) {
      return [];
    }

    const related = this.watches
      .filter(watch => 
        watch.Id !== parseInt(watchId) && 
        watch.category === currentWatch.category &&
        watch.brand !== currentWatch.brand
      )
      .slice(0, limit);

    return related;
  }

  // Get watches in stock
  async getInStock() {
    await delay(200);
    
    return this.watches.filter(watch => watch.inStock);
  }

  // Get price range for filters
  getPriceRange() {
    const prices = this.watches.map(watch => watch.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  // Get available categories
  getCategories() {
    const categories = [...new Set(this.watches.map(watch => watch.category))];
    return categories.sort();
  }

  // Get available brands
  getBrands() {
    const brands = [...new Set(this.watches.map(watch => watch.brand))];
    return brands.sort();
  }
}

export default new WatchService();