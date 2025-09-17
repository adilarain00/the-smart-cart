import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillStar, AiOutlineStar, AiOutlineMessage } from 'react-icons/ai';
import { brandingData } from '../../static/data';

const UserReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Verified Buyer',
      rating: 5,
      comment:
        'Absolutely love the quality of products here! Fast delivery and excellent customer service. Will definitely shop again.',
      avatar:
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      verified: true,
      purchase: 'iPhone 14 Pro',
    },
    {
      id: 2,
      name: 'Admin Team',
      role: 'Customer Support',
      rating: 5,
      comment:
        "We're committed to providing the best shopping experience. Your satisfaction is our top priority!",
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      purchase: 'Premium Support',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Loyal Customer',
      rating: 5,
      comment:
        "Best prices I've found online! The product range is incredible and shipping is always on time.",
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      purchase: 'Gaming Laptop',
    },
    {
      id: 4,
      name: 'Admin Team',
      role: 'Quality Assurance',
      rating: 5,
      comment:
        'We carefully curate every product to ensure you receive only the best quality items.',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      purchase: 'Quality Products',
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      role: 'First-time Buyer',
      rating: 5,
      comment:
        'Amazing first experience! The website is so easy to navigate and checkout was a breeze.',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true,
      purchase: 'Wireless Headphones',
    },
    {
      id: 6,
      name: 'Admin Team',
      role: 'Technical Support',
      rating: 5,
      comment:
        "Our platform is designed with you in mind. We're constantly improving to serve you better!",
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      verified: true,
      purchase: 'Platform Experience',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section className='w-full py-12 bg-white'>
        <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-4'>
            <h2 className='text-3xl sm:text-4xl font-bold  mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
              What Our Customers Say
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Real reviews from verified customers and our dedicated team
            </p>
          </div>

          <div className='relative'>
            {/* Main Review Display */}
            <div className='relative h-[400px] overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className='absolute inset-0 flex items-center justify-center'
                >
                  <div className='max-w-4xl mx-auto'>
                    <div className='bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center relative'>
                      <div className='absolute -top-6 left-1/2 transform -translate-x-1/2'>
                        <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                          <AiOutlineMessage className='text-white text-xl' />
                        </div>
                      </div>

                      <div className='mb-8'>
                        <p className='text-lg sm:text-xl text-gray-700 leading-relaxed italic mb-6'>
                          "{reviews[currentIndex].comment}"
                        </p>

                        <div className='flex items-center justify-center gap-1 mb-4'>
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < reviews[currentIndex].rating ? (
                                <AiFillStar className='text-yellow-400 text-xl' />
                              ) : (
                                <AiOutlineStar className='text-gray-300 text-xl' />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <div className='relative'>
                          <img
                            src={reviews[currentIndex].avatar}
                            alt={reviews[currentIndex].name}
                            className='w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg'
                          />
                          {reviews[currentIndex].verified && (
                            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-white'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className='text-center sm:text-left'>
                          <h4 className='font-bold text-lg text-gray-800'>
                            {reviews[currentIndex].name}
                          </h4>
                          <p className='text-sm text-gray-600 mb-1'>
                            {reviews[currentIndex].role}
                          </p>
                          <p className='text-xs text-blue-600 font-medium'>
                            Purchased: {reviews[currentIndex].purchase}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prevSlide}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 z-10'
              aria-label='Previous review'
            >
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 z-10'
              aria-label='Next review'
            >
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>

            <div className='flex justify-center mt-2 gap-2'>
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className='max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 mb-6 px-10 cursor-pointer'>
        {brandingData?.map((item, idx) => (
          <div
            key={idx}
            className='flex flex-col  items-center hover:border border-blue-700  rounded-2xl p-2 sm:p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 hover:-translate-y-2'
          >
            <div className='flex-shrink-0 w-20 h-20 flex items-center justify-center text-3xl sm:text-4xl text-gray-600 mb-2'>
              {item.icon}
            </div>
            <div className='text-center'>
              <h3 className='font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-lg sm:text-xl text-gray-800 mb-2'>
                {item.title}
              </h3>
              <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                {item.Description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserReviews;
