import React from 'react';

const CalendarShimmer = () => {
  return (
    <div className="text-center mt-12 px-4 sm:px-8 md:px-16">
      {/* Shimmer for Unified Controls (Month & Year) */}
      <div className="flex justify-center items-center mb-6 space-x-4 flex-wrap">
        <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div> {/* Month Dropdown Shimmer */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-10 bg-gray-300 animate-pulse rounded-md"></div> {/* Year Input Shimmer */}
        </div>
      </div>

      {/* Shimmer for 3 Calendar Views */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 shadow-lg rounded-lg bg-white overflow-hidden relative">
            {/* Header shimmer */}
            <div className="w-24 h-6 bg-gray-300 animate-pulse mb-4 rounded-sm"></div>
            
            {/* Calendar tile shimmer */}
            <div className="w-full h-72 bg-gray-100 animate-pulse rounded-lg flex justify-center items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarShimmer;

