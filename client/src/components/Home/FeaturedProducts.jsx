import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Products/ProductCard';

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [productsToShow, setProductsToShow] = useState(8);

  const handleShowMore = () => {
    setProductsToShow(productsToShow + 8);
  };

  return (
    <section className='w-full py-16 bg-white'>
      <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 leading-snug'>
            <span className='text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
              Featured Products
            </span>
          </h2>
          <p className='text-gray-500 text-sm sm:text-base'>
            Specially curated for you
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14'>
          {allProducts && allProducts.length > 0 ? (
            allProducts
              .slice(0, productsToShow)
              .map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-16 h-16 mb-4 text-blue-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 13V5H4v8M4 13v6h16v-6'
                />
              </svg>
              <p className='text-lg font-medium'>
                No featured products available
              </p>
              <p className='text-sm mt-1 text-gray-400'>
                Our top picks will appear here once added.
              </p>
            </div>
          )}
        </div>
        {allProducts && allProducts.length > productsToShow && (
          <button
            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:text-gray-100 font-bold py-2 px-24 rounded flex items-center justify-center mx-auto'
            onClick={handleShowMore}
          >
            Show More...
          </button>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
