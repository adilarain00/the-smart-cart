import { Link } from 'react-router-dom';
import { navItems } from '../../static/data';

const Navbar = () => {
  return (
    <nav className=' flex gap-1 h-full items-center 800px:flex-row flex-col'>
      {navItems &&
        navItems.map((i) => {
          return (
            <Link
              key={i.url}
              to={i.url}
              className='px-5 py-2 font-semibold  
                hover:text-blue-600
                text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition duration-300 h-full flex items-center'
            >
              {i.title}
            </Link>
          );
        })}
    </nav>
  );
};

export default Navbar;
