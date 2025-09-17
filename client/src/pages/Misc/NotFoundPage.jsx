import { useEffect } from 'react';
import { img404 } from '../../assets';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white px-4'>
      <img src={img404} alt='404' className='w-60 md:w-80 mb-6' />
      <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center'>
        Oops! Page not found.
      </h2>
      <p className='text-gray-500 mb-8 text-center'>
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back on track!
      </p>
      <button
        onClick={() => navigate(-1)}
        className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded transition'
      >
        Take Me Back
      </button>
    </div>
  );
};

export default NotFoundPage;
