import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title, message, actionLabel, onAction, icon = "Search" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-full flex items-center justify-center mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-accent" />
        </div>
        
        <h3 className="font-display text-2xl font-semibold text-primary mb-3">
          {title || "No watches found"}
        </h3>
        
        <p className="text-secondary text-lg mb-8 leading-relaxed">
          {message || "We couldn't find any watches matching your criteria. Try adjusting your filters or browse our full collection."}
        </p>
        
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-98 inline-flex items-center gap-2"
          >
            <ApperIcon name="ShoppingBag" className="w-4 h-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;