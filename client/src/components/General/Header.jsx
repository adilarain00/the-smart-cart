import { useEffect, useRef, useState } from 'react';
import {
  logo,
  productPlaceholderImg,
  profilePlaceholderImg,
} from '../../assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { categoriesData } from '../../static/data';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import Navbar from './Navbar';
import Cart from '../General/Cart';
import DropDown from './DropDown';
import Wishlist from '../General/Wishlist';

const Header = () => {
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener('scroll', () => {
    setActive(window.scrollY > 70);
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setDropDown(false);
      }
    }

    if (dropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchData(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='w-full  border-b border-gray-300 bg-white'>
        <div className='max-w-[1500px] mx-auto flex flex-wrap items-center justify-between py-4 px-8 gap-4'>
          <Link to='/' className='flex-shrink-0 inline-flex items-center gap-2'>
            <img
              src={logo}
              alt='Multivendor'
              className='h-9 sm:h-11 md:h-13 w-auto  object-contain'
            />
            <h1 className='text-xl sm:text-2xl md:text-[2.1rem] font-bold font-()'>
              The
              <span
                className='bg-gradient-to-r from-blue-500 to-purple-600 
        bg-clip-text text-transparent 
               hover:from-blue-600 hover:to-purple-700 
               active:from-blue-700 active:to-purple-800'
              >
                Smart
              </span>
              Cart
            </h1>
          </Link>

          <div className='hidden 800px:flex items-center flex-wrap gap-9'>
            <div
              className='relative w-[1700px] sm:w-[220px] md:w-[500px]'
              ref={searchRef}
            >
              <input
                type='text'
                placeholder='Search for products...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full border border-gray-400 rounded-lg py-[0.52rem] pl-5 pr-12 text-base focus:outline-none focus:border-indigo-600'
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-800'>
                <AiOutlineSearch size={20} />
              </button>

              {searchData && searchData.length > 0 && (
                <div className='absolute left-0 right-0 mt-2 bg-white shadow-lg rounded z-10 max-h-60 overflow-y-auto'>
                  {searchData.map((i) => (
                    <Link
                      to={`/product/${i._id}`}
                      key={i._id}
                      className='flex items-center px-4 py-2 hover:bg-gray-100'
                    >
                      <img
                        src={
                          i.images && i.images[0]?.url
                            ? i.images[0].url
                            : productPlaceholderImg
                        }
                        alt={i.name}
                        className='w-8 h-8 mr-3 rounded'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = productPlaceholderImg;
                        }}
                      />
                      <span className='text-gray-800'>{i.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setOpenWishlist(true)} className='relative'>
              <AiOutlineHeart size={22} className='text-black cursor-pointer' />
              <span className='absolute -top-2 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {wishlist && wishlist.length > 0 ? wishlist.length : 0}
              </span>
            </button>

            <button onClick={() => setOpenCart(true)} className='relative'>
              <RiShoppingCartLine size={22} className='text-black' />
              <span className='absolute -top-2 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {cart && cart.length > 0 ? cart.length : 0}
              </span>
            </button>

            <div>
              {isAuthenticated ? (
                <Link to='/user/profile'>
                  <img
                    src={user?.avatar?.url || profilePlaceholderImg}
                    className='w-7 h-7 rounded-full object-cover border-2 border-blue-600'
                    alt='profile'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profilePlaceholderImg;
                    }}
                  />
                </Link>
              ) : (
                <Link to='/user/login'>
                  <FiUser size={22} className='text-black' />
                </Link>
              )}
            </div>

            <Link
              to={isSeller ? '/seller/dashboard' : '/seller/register'}
              className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium border border-transparent hover:bg-white transition  text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100'
            >
              {isSeller ? 'Go Dashboard' : 'Become Seller'}
            </Link>
          </div>

          <button
            className='800px:hidden flex items-center text-black'
            onClick={() => setMobileMenuOpen(true)}
            aria-label='Open menu'
          >
            <FiMenu size={28} />
          </button>
        </div>
      </div>

      <div
        className={`${
          active ? 'shadow-sm z-10' : ''
        } transition hidden 800px:flex items-center w-full bg-slate-800 h-[60px]`}
      >
        <div className='w-[95%] sm:w-11/12 mx-auto flex justify-between items-center h-full px-2'>
          <div
            ref={categoriesRef}
            className='relative h-[60px] w-[220px] flex items-center'
            style={{ zIndex: 20 }}
          >
            <button
              className='h-full w-full flex justify-between items-center pl-8 pr-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white font-sans text-base font-medium select-none'
              onClick={() => setDropDown((prev) => !prev)}
              type='button'
            >
              <span className='flex items-center'>All Categories</span>
              <IoIosArrowDown
                size={18}
                className='ml-2 text-white cursor-pointer'
              />
            </button>
            {dropDown && (
              <div className='absolute left-0 top-full w-full'>
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          <Navbar />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 bg-opacity-40 transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } 800px:hidden`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex items-center justify-between px-4 py-4 border-b'>
            <img src={logo} alt='Logo' className='h-10' />
            <button
              className='cursor-pointer text-red-600 hover:text-red-700 transition hover:rotate-180'
              onClick={() => setMobileMenuOpen(false)}
              aria-label='Close menu'
            >
              <FiX size={28} />
            </button>
          </div>
          <div className='p-4 space-y-4 h-[calc(100vh-64px)] overflow-y-auto'>
            <div className='relative' ref={searchRef}>
              <input
                type='text'
                placeholder='Search for products...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full border border-gray-400 rounded-full py-[0.58rem] pl-5 pr-12 text-base focus:outline-none focus:border-indigo-600'
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                <AiOutlineSearch size={20} />
              </button>

              {searchData && searchData.length > 0 && (
                <div className='absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto'>
                  {searchData.map((i) => (
                    <Link
                      to={`/product/${i._id}`}
                      key={i._id}
                      className='flex items-center px-4 py-2 hover:bg-gray-100'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src={
                          i.image_Url && i.image_Url[0]?.url
                            ? i.image_Url[0].url
                            : productPlaceholderImg
                        }
                        alt={i.name}
                        className='w-8 h-8 mr-3 rounded'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = productPlaceholderImg;
                        }}
                      />
                      <span className='text-gray-800'>{i.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className='flex items-center gap-6'>
              <button
                onClick={() => {
                  setOpenWishlist(true);
                  setMobileMenuOpen(false);
                }}
                className='relative'
              >
                <AiOutlineHeart size={22} className='text-gray-500' />
                <span className=' absolute -top-2 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {wishlist && wishlist.length > 0 ? wishlist.length : 0}
                </span>
              </button>
              <button
                onClick={() => {
                  setOpenCart(true);
                  setMobileMenuOpen(false);
                }}
                className='relative'
              >
                <RiShoppingCartLine size={22} className='text-gray-500' />
                <span className='  absolute -top-2 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {cart && cart.length > 0 ? cart.length : 0}
                </span>
              </button>
              <div>
                {isAuthenticated ? (
                  <Link
                    to='/user/profile'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img
                      src={user?.avatar?.url || profilePlaceholderImg}
                      className='w-7 h-7 rounded-full object-cover border-2 border-gray-500'
                      alt='profile'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = profilePlaceholderImg;
                      }}
                    />
                  </Link>
                ) : (
                  <Link
                    to='/user/login'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUser size={22} className='text-gray-500' />
                  </Link>
                )}
              </div>
              <Link
                to='/seller/register'
                onClick={() => setMobileMenuOpen(false)}
                className='block p-2  text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600  rounded-full font-medium border border-transparent hover:bg-white transition  text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100'
              >
                Become Seller
              </Link>
            </div>

            <div className='mt-8'>
              <div className='rounded-xl bg-gray-800 py-12'>
                <Navbar mobileMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
