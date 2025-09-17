import React from 'react';

const DashboardLoader = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
          <div className='flex items-center space-x-4'>
            <div className='h-9 w-48 bg-gray-200 hover:bg-gray-300 rounded-lg animate-pulse'></div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-gray-300 rounded-full animate-pulse'></div>
              <div className='h-4 w-16 bg-gray-200 hover:bg-gray-300 rounded animate-pulse'></div>
            </div>
          </div>
          <div className='flex items-center space-x-4 mt-4 sm:mt-0'>
            <div className='h-8 w-24 bg-gray-200 hover:bg-gray-300 rounded-lg animate-pulse'></div>
            <div className='flex space-x-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-10 w-28 bg-gray-200 hover:bg-gray-300 rounded-lg animate-pulse'
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full animate-pulse'></div>
                <div className='h-6 w-16 bg-gray-200 hover:bg-gray-300 rounded-full animate-pulse'></div>
              </div>
              <div className='h-4 w-24 bg-gray-200 hover:bg-gray-300 rounded mb-2 animate-pulse'></div>
              <div className='h-8 w-32 bg-gray-200 hover:bg-gray-300 rounded animate-pulse'></div>
            </div>
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {[1, 2].map((i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'
            >
              <div className='h-6 w-48 bg-gray-200 hover:bg-gray-300 rounded mb-4 animate-pulse'></div>
              <div className='h-80 bg-gray-100 rounded-lg animate-pulse'></div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'
            >
              <div className='h-6 w-32 bg-gray-200 hover:bg-gray-300 rounded mb-4 animate-pulse'></div>
              <div className='space-y-3'>
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='space-y-2'>
                      <div className='h-4 w-20 bg-gray-200 hover:bg-gray-300 rounded animate-pulse'></div>
                      <div className='h-3 w-16 bg-gray-200 hover:bg-gray-300 rounded animate-pulse'></div>
                    </div>
                    <div className='h-6 w-16 bg-gray-200 hover:bg-gray-300 rounded-full animate-pulse'></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
