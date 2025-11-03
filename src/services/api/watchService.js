import { getApperClient } from "@/services/apperClient";

// Simulate API delay for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WatchService {
  async getAll(filters = {}) {
    await delay(300);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "strap_material_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        where: [],
        orderBy: [{"fieldName": "Id", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      // Apply category filter
      if (filters.categories && filters.categories.length > 0) {
        params.where.push({
          "FieldName": "category_c",
          "Operator": "ExactMatch",
          "Values": filters.categories,
          "Include": true
        });
      }

      // Apply brand filter
      if (filters.brands && filters.brands.length > 0) {
        params.where.push({
          "FieldName": "brand_c",
          "Operator": "ExactMatch",
          "Values": filters.brands,
          "Include": true
        });
      }

      // Apply price range filter
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        params.where.push({
          "FieldName": "price_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [min.toString()],
          "Include": true
        });
        params.where.push({
          "FieldName": "price_c",
          "Operator": "LessThanOrEqualTo",
          "Values": [max.toString()],
          "Include": true
        });
      }

      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search;
        params.whereGroups = [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "brand_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "model_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "category_c", "operator": "Contains", "values": [searchTerm]},
                {"fieldName": "description_c", "operator": "Contains", "values": [searchTerm]}
              ],
              "operator": "OR"
            }
          ]
        }];
      }

      const response = await apperClient.fetchRecords('watch_c', params);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch watches");
      }

      // Transform database fields to UI format
      return response.data.map(watch => this.transformWatchData(watch));
    } catch (error) {
      console.error("Error fetching watches:", error);
      throw error;
    }
  }

  async getById(id) {
    await delay(200);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "strap_material_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}}
        ]
      };

      const response = await apperClient.getRecordById('watch_c', parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message || `Watch with ID ${id} not found`);
      }

      return this.transformWatchData(response.data);
    } catch (error) {
      console.error(`Error fetching watch ${id}:`, error);
      throw error;
    }
  }

  async getByCategory(category) {
    await delay(250);
    
    return this.getAll({ categories: [category.toLowerCase()] });
  }

  async getFeatured(limit = 4) {
    await delay(200);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "strap_material_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        orderBy: [{"fieldName": "price_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      };

      const response = await apperClient.fetchRecords('watch_c', params);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch featured watches");
      }

      return response.data.map(watch => this.transformWatchData(watch));
    } catch (error) {
      console.error("Error fetching featured watches:", error);
      throw error;
    }
  }

  async searchWatches(query) {
    await delay(250);
    
    if (!query || query.trim() === "") {
      return [];
    }

    return this.getAll({ search: query.trim() });
  }

  async getRelated(watchId, limit = 4) {
    await delay(200);
    
    try {
      // First get the current watch to know its category and brand
      const currentWatch = await this.getById(watchId);
      if (!currentWatch) {
        return [];
      }

      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "strap_material_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        where: [
          {
            "FieldName": "Id",
            "Operator": "NotEqualTo",
            "Values": [watchId.toString()],
            "Include": true
          },
          {
            "FieldName": "category_c",
            "Operator": "EqualTo",
            "Values": [currentWatch.category],
            "Include": true
          },
          {
            "FieldName": "brand_c",
            "Operator": "NotEqualTo",
            "Values": [currentWatch.brand],
            "Include": true
          }
        ],
        pagingInfo: {"limit": limit, "offset": 0}
      };

      const response = await apperClient.fetchRecords('watch_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch related watches:", response.message);
        return [];
      }

      return response.data.map(watch => this.transformWatchData(watch));
    } catch (error) {
      console.error("Error fetching related watches:", error);
      return [];
    }
  }

  async getInStock() {
    await delay(200);
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "model_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "movement_c"}},
          {"field": {"Name": "case_size_c"}},
          {"field": {"Name": "case_material_c"}},
          {"field": {"Name": "strap_material_c"}},
          {"field": {"Name": "water_resistance_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        where: [
          {
            "FieldName": "in_stock_c",
            "Operator": "EqualTo",
            "Values": ["true"],
            "Include": true
          }
        ]
      };

      const response = await apperClient.fetchRecords('watch_c', params);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch in-stock watches");
      }

      return response.data.map(watch => this.transformWatchData(watch));
    } catch (error) {
      console.error("Error fetching in-stock watches:", error);
      throw error;
    }
  }

  getPriceRange() {
    // Static range for now - could be made dynamic with aggregator queries
    return {
      min: 0,
      max: 50000
    };
  }

  getCategories() {
    // Based on database picklist values: luxury,sport,fashion,smartwatch
    return ["luxury", "sport", "fashion", "smartwatch"];
  }

  getBrands() {
    // Common watch brands - could be made dynamic by querying distinct values
    return ["Apple", "Breitling", "Casio", "Citizen", "Daniel Wellington", "Fossil", "Omega", "Rolex", "Samsung", "Seiko", "TAG Heuer", "Tissot"];
  }

  // Transform database fields to UI format
  transformWatchData(watchData) {
    const images = watchData.images_c ? 
      (typeof watchData.images_c === 'string' ? watchData.images_c.split('\n').filter(img => img.trim()) : []) :
      ['https://images.unsplash.com/photo-1523170335258-f5c0b11c7e10?w=500&h=500&fit=crop']; // Default image

    const specifications = watchData.specifications_c ? 
      (typeof watchData.specifications_c === 'string' ? 
        this.parseSpecifications(watchData.specifications_c) : watchData.specifications_c) : 
      {};

    return {
      Id: watchData.Id,
      brand: watchData.brand_c || '',
      model: watchData.model_c || '',
      price: parseFloat(watchData.price_c) || 0,
      category: watchData.category_c || '',
      description: watchData.description_c || '',
      inStock: watchData.in_stock_c === true || watchData.in_stock_c === 'true',
      movement: watchData.movement_c || '',
      caseSize: watchData.case_size_c || '',
      caseMaterial: watchData.case_material_c || '',
      strapMaterial: watchData.strap_material_c || '',
      waterResistance: watchData.water_resistance_c || '',
      images: images,
      specifications: specifications
    };
  }

  // Parse specifications from multiline text
  parseSpecifications(specsText) {
    try {
      // Try to parse as JSON first
      return JSON.parse(specsText);
    } catch {
      // If not JSON, parse as key-value pairs
      const specs = {};
      if (specsText) {
        const lines = specsText.split('\n');
        lines.forEach(line => {
          const [key, value] = line.split(':').map(s => s.trim());
          if (key && value) {
            specs[key] = value;
          }
        });
      }
      return specs;
    }
  }
}

export default new WatchService();
export default new WatchService();