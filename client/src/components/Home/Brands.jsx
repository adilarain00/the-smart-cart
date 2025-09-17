import { sponsoredBrands } from '../../static/data';

const Brands = () => {
  return (
    <section className='w-full pt-16 pb-6 bg-white '>
      <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-2 sm:gap-4'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 leading-snug'>
            <span className='text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
              Trusted Brands
            </span>
          </h2>
          <p className='text-gray-500 text-sm sm:text-base'>
            Premium brands, carefully selected for quality
          </p>
        </div>

        <div className='mb-12 font-semibold text-gray-700 text-center px-2'>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 bg-white'>
            {sponsoredBrands.map((brand, idx) => (
              <div
                key={idx}
                className='bg-white w-full aspect-square rounded-xl sm:rounded-2xl shadow-lg flex flex-col items-center justify-center border border-transparent hover:border-blue-700 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer p-2 sm:p-4'
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className='w-12 h-12 sm:w-16 sm:h-20 object-contain mb-2 sm:mb-3'
                />
                <span className='text-md bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 font-semibold text-gray-700 text-center px-2'>
                  {brand.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
