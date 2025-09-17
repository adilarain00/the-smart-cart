import { Link } from 'react-router-dom';

const Breadcrumb = ({ mainTitle, page }) => {
  return (
    <div className='bg-white py-4'>
      <div className='ml-24 flex items-center'>
        <h2 className='text-md text-gray-500 uppercase'>{mainTitle}</h2>

        <span className='border-gray-300 mx-2'>/</span>
        <div className='text-md text-gray-500 tracking-widest uppercase'>
          <Link to='/' className='hover:text-gray-600 transition'>
            Home
          </Link>
          <span className='border-gray-300 mx-2 text-black'>/</span>

          <span className='text-gray-500'>{page}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
