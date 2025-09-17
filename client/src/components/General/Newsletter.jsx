import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className='w-full py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='rounded-lg p-6 md:p-12 flex flex-col md:flex-row items-center md:items-stretch text-center md:text-left border  relative overflow-hidden gap-10 md:gap-0'>
          {/* Decorative Icon */}
          <div className='absolute -top-6 right-6 opacity-10 text-[8rem] pointer-events-none select-none'>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='4'
                y='12'
                width='40'
                height='24'
                rx='4'
                fill='url(#paint0_linear)'
              />
              <rect x='8' y='16' width='32' height='16' rx='2' fill='#fff' />
              <path
                d='M8 16L24 28L40 16'
                stroke='#a78bfa'
                strokeWidth='2'
                strokeLinejoin='round'
              />
              <defs>
                <linearGradient
                  id='paint0_linear'
                  x1='4'
                  y1='12'
                  x2='44'
                  y2='36'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#3b82f6' />
                  <stop offset='1' stopColor='#a78bfa' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Left: Text */}
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center md:items-start z-10 md:pr-6 mb-8 md:mb-0'>
            <h2 className='text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4 text-center md:text-left'>
              Join our SmartCart Newsletter
            </h2>
            <p className='text-gray-600 text-lg max-w-xl'>
              Get exclusive deals, early access to new arrivals, and smart
              shopping tips delivered straight to your inbox.
            </p>
          </div>
          {/* Right: Input/Form */}
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center md:items-start z-10 md:pl-6'>
            <form
              onSubmit={handleSubmit}
              className='w-full max-w-md flex flex-col sm:flex-row gap-3'
            >
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
                className='flex-1 px-16 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 shadow-sm transition'
                required
              />
              <button
                type='submit'
                className='px-10 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200'
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <div className='mt-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-6 py-2 shadow-sm transition-all animate-fade-in'>
                <span role='img' aria-label='celebration'>
                  🎉
                </span>{' '}
                Thank you for subscribing!
              </div>
            )}
            <p className='text-gray-400 text-xs mt-4 px-2'>
              No spam, only smart deals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
