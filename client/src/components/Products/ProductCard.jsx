import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/actions/wishlist';
import ProductDetailsCard from './ProductDetailsCard';
import { productPlaceholderImg } from '../../assets';

const ProductCard = ({ data, isEvent }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error('Item already in cart!');
    } else {
      if (data.stock < 1) {
        toast.error('Product stock limited!');
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success('Item added to cart successfully!');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? (
            <AiFillStar className='text-yellow-400 text-sm' />
          ) : (
            <AiOutlineStar className='text-gray-300 text-sm' />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 relative'>
        <div className='relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
          <Link
            to={
              isEvent
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }
            className='block w-full'
          >
            <img
              src={
                data.images && data.images[0]?.url
                  ? data.images[0].url
                  : productPlaceholderImg
              }
              alt={data.name}
              className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 bg-white

'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = productPlaceholderImg;
              }}
            />
          </Link>
          <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0'>
            <button
              className='w-10 h-10 bg-white rounded-full border bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 border-gray-500 shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center hover:scale-110'
              onClick={() =>
                click
                  ? removeFromWishlistHandler(data)
                  : addToWishlistHandler(data)
              }
              aria-label={click ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {click ? (
                <AiFillHeart size={18} className='text-green-600' />
              ) : (
                <AiOutlineHeart size={18} className='text-white' />
              )}
            </button>
            <button
              className='w-10 h-10 bg-white text-white rounded-full shadow-lg border bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 border-gray-500 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center hover:scale-110'
              onClick={() => setQuickViewOpen(true)}
              aria-label='Quick View'
            >
              <AiOutlineEye size={18} className='text-white' />
            </button>
            <button
              className='w-10 h-10 bg-white rounded-full shadow-lg border border-gray-500 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center hover:scale-110'
              onClick={() => addToCartHandler(data?._id)}
              aria-label='Add to Cart'
            >
              <AiOutlineShoppingCart size={18} className='text-white' />
            </button>
          </div>
          {data.originalPrice && data.originalPrice !== data.discountPrice && (
            <div className='absolute top-3 left-3'>
              <span className='bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                {Math.round(
                  ((data.originalPrice - data.discountPrice) /
                    data.originalPrice) *
                    100
                )}
                % OFF
              </span>
            </div>
          )}
          {data.stock < 1 && (
            <div className='absolute top-3 left-3'>
              <span className='bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className='p-3'>
          <Link to={`/seller/profile/preview/${data?.seller?._id}`}>
            <h5 className='text-xs font-semibold text-black transition-colors tracking-wide uppercase'>
              {data.seller?.name}
            </h5>
          </Link>
          <Link
            to={
              isEvent
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }
          >
            <h4 className='font-bold text-gray-800 text-base leading-tight min-h-[32px] hover:text-gray-600 transition-colors overflow-hidden'>
              {data.name.length > 40
                ? data.name.slice(0, 40) + '...'
                : data.name}
            </h4>
          </Link>
          <div className='flex items-center gap-2 mb-3'>
            <div className='flex items-center gap-1'>
              {renderStars(data?.ratings || 0)}
            </div>
            <span className='text-xs text-gray-500'>
              ({data?.ratings || 0})
            </span>
          </div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-baseline gap-2'>
              <h5 className='text-xl font-bold text-green-600'>
                ${data.discountPrice}
              </h5>
              {data.originalPrice &&
                data.originalPrice !== data.discountPrice && (
                  <h4 className='text-sm text-gray-400 line-through'>
                    ${data.originalPrice}
                  </h4>
                )}
            </div>
            <div className='text-right'>
              <span className='text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700'>
                {data.soldOut || 0} sold
              </span>
            </div>
          </div>
          <button
            onClick={() => addToCartHandler(data?._id)}
            disabled={data.stock < 1}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
              data.stock < 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : ' hover:bg-white hover:border bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {data.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      {quickViewOpen &&
        typeof window !== 'undefined' &&
        require('react-dom').createPortal(
          <ProductDetailsCard setOpen={setQuickViewOpen} data={data} />,
          document.body
        )}
    </>
  );
};

export default ProductCard;
