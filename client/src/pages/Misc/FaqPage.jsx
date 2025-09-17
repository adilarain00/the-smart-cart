import { useEffect, useState } from 'react';
import { FaqData } from '../../static/data';
import { Header, Footer, Breadcrumb } from '../../components';

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTab = (idx) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <div>
      <Header />
      <Breadcrumb mainTitle='Questions' page='FAQ' />
      <div className='w-full flex flex-col items-center mt-3 mb-12'>
        <h2 className='text-3xl font-bold text-center mb-5 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text'>
          FAQ
        </h2>
        <div className='w-[70%] mx-auto'>
          <div className='divide-y divide-gray-300'>
            {FaqData.map((faq, idx) => (
              <div key={idx} className='py-4'>
                <button
                  className={`flex items-center justify-between w-full text-left focus:outline-none transition-colors ${
                    activeTab === idx
                      ? 'text-blue-600'
                      : 'text-gray-800 hover:text-blue-500'
                  }`}
                  onClick={() => toggleTab(idx)}
                  aria-expanded={activeTab === idx}
                >
                  <span className='text-lg font-semibold'>{faq.question}</span>
                  <span
                    className={`transition-transform duration-300 ${
                      activeTab === idx ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='url(#faq-gradient)'
                    >
                      <defs>
                        <linearGradient
                          id='faq-gradient'
                          x1='0'
                          y1='0'
                          x2='24'
                          y2='24'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stopColor='#3b82f6' />
                          <stop offset='1' stopColor='#a21caf' />
                        </linearGradient>
                      </defs>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeTab === idx ? 'max-h-40 mt-3' : 'max-h-0'
                  }`}
                >
                  {activeTab === idx && (
                    <p className='text-base text-gray-600'>{faq.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
