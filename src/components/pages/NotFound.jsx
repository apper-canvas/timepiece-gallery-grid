import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <ApperIcon name="Clock" size={64} className="mx-auto text-secondary" />
          <h1 className="font-display text-4xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-semibold text-primary">Page Not Found</h2>
          <p className="text-gray-600">
            The timepiece you're looking for seems to have gotten lost in time.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            as={Link} 
            to="/" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white"
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            Back to Gallery
          </Button>
          
          <Button 
            as={Link} 
            to="/category/luxury" 
            variant="outline" 
            className="w-full border-secondary text-secondary hover:bg-secondary/10"
          >
            <ApperIcon name="Search" size={16} className="mr-2" />
            Browse Collection
          </Button>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our watch experts
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;