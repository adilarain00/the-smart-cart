import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';

const Categories = () => {
  const navigate = useNavigate();
  const animationRef = useRef(null);

  const animate = useCallback(() => {
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  return (
    <>
      <section className='w-full py-16 bg-white' id='categories'>
        <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4'>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 leading-snug'>
              <span className='text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
                Shop by Category
              </span>
            </h2>
            <p className='text-gray-500 text-sm sm:text-base'>
              Discover products across all categories
            </p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 place-items-center'>
            {categoriesData.map((category) => {
              const handleClick = () => {
                const encodedCategory = encodeURIComponent(category.title);
                navigate(`/products?category=${encodedCategory}`);
              };
              return (
                <div
                  key={category.id}
                  onClick={handleClick}
                  className='group flex flex-col items-center cursor-pointer w-full max-w-48'
                >
                  <div className='w-full aspect-square bg-white rounded-2xl shadow-lg border-2 border-transparent transition-all duration-500 hover:scale-105 hover:border-blue-600 hover:shadow-xl hover:-translate-y-2 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:-translate-y-2'>
                    <img
                      src={category.image_Url}
                      alt={category.title}
                      className='w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  <span className='text-center text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300'>
                    {category.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
