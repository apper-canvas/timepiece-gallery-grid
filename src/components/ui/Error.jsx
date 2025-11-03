import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
        </div>
        
        <h3 className="font-display text-2xl font-semibold text-primary mb-3">
          Something went wrong
        </h3>
        
        <p className="text-secondary text-lg mb-6 leading-relaxed">
          {message || "We encountered an error while loading the content. Please try again."}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-98 inline-flex items-center gap-2"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;