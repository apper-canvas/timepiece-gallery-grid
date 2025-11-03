import React from "react";

const Loading = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-48 animate-pulse"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border animate-shimmer">
            {/* Image Skeleton */}
            <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 via-gray-200 to-gray-200 bg-[length:200%_100%] rounded-lg mb-4"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 via-gray-200 to-gray-200 bg-[length:200%_100%] rounded w-3/4"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 via-gray-200 to-gray-200 bg-[length:200%_100%] rounded w-1/2"></div>
              <div className="h-5 bg-gradient-to-r from-accent/20 via-accent/40 via-accent/20 to-accent/20 bg-[length:200%_100%] rounded w-20"></div>
              <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 via-gray-200 to-gray-200 bg-[length:200%_100%] rounded-lg mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;