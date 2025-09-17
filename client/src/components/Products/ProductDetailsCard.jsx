import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { addToCart } from '../../redux/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/actions/wishlist';
import axios from 'axios';
import { productPlaceholderImg, profilePlaceholderImg } from '../../assets';

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (data && data?.seller._id) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/products/seller/${data.seller._id}`
          );
          setSellerProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching seller products:', error);
        }
      }
    };

    fetchSellerProducts();

    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const sellerId = data.seller._id;
      const groupTitle = [userId, sellerId].sort().join('_');

      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/conversations/new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        )
        .then((res) => {
          navigate(`/user/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error('Please login to send a message!');
      navigate('/user/login');
    }
  };

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const existingItem = cart.find((item) => item._id === id);
    if (existingItem) {
      toast.error('Item already in cart. Please update quantity.');
      return;
    } else {
      if (data.stock < count) {
        toast.error('Product stock is limited. Please reduce quantity.');
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success('Item added to cart.');
      }
    }
  };

  const totalReviewsLength =
    sellerProducts &&
    sellerProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    sellerProducts &&
    sellerProducts.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(1);

  return (
    <div>
      {data ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity'></div>
          <div className='relative w-full max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 z-10 animate-fadeIn'>
            <button
              className='absolute right-4 top-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-blue-100 transition'
              onClick={() => setOpen(false)}
              aria-label='Close'
            >
              <RxCross1 size={28} />
            </button>
            <div className='flex-1 flex flex-col items-center justify-center gap-4'>
              <div className='w-full flex justify-center mb-2'>
                <img
                  src={
                    imgError
                      ? productPlaceholderImg
                      : data.images && data.images[0]?.url
                  }
                  alt={data.name}
                  className='w-[220px] h-[220px] object-contain rounded-lg shadow-md bg-gray-50 border'
                  onError={() => setImgError(true)}
                />
              </div>
              <Link
                to={`/seller/profile/preview/${data.seller._id}`}
                className='flex items-center gap-3 mb-2 hover:underline'
              >
                <img
                  src={data?.seller?.avatar?.url}
                  alt={data.seller.name}
                  className='w-12 h-12 rounded-full border-2 border-blue-400 object-cover shadow'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = profilePlaceholderImg;
                  }}
                />
                <div>
                  <h3 className='font-semibold text-blue-600 text-base'>
                    {data.seller.name}
                  </h3>
                  <h5 className='text-xs text-gray-500'>
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </Link>
              <button
                className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg py-2 shadow transition'
                onClick={handleMessageSubmit}
              >
                <AiOutlineMessage size={20} /> Send Message
              </button>
              <h5 className='text-sm text-red-500 mt-2 font-semibold'>
                ({data.soldOut || 0}) Sold out
              </h5>
            </div>
            <div className='flex-1 flex flex-col gap-4 justify-center'>
              <h1 className='text-2xl font-bold text-gray-800 mb-1'>
                {data.name}
              </h1>
              <p className='text-gray-700 mb-1 text-base'>{data.description}</p>
              <div className='flex items-center gap-4 mb-2'>
                <h4 className='text-2xl font-bold text-blue-500'>
                  ${data.discountPrice}
                </h4>
                {data.originalPrice &&
                  data.originalPrice !== data.discountPrice && (
                    <h3 className='text-lg text-gray-400 line-through'>
                      ${data.originalPrice}
                    </h3>
                  )}
                {data.originalPrice &&
                  data.originalPrice !== data.discountPrice && (
                    <span className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 shadow'>
                      {Math.round(
                        ((data.originalPrice - data.discountPrice) /
                          data.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
              </div>
              <div className='flex items-center gap-6 mt-2'>
                <div className='flex items-center border rounded-lg overflow-hidden shadow'>
                  <button
                    className='bg-gray-100 text-gray-700 px-3 py-2 hover:bg-blue-100 transition font-bold'
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className='px-5 py-2 text-base font-semibold bg-white'>
                    {count}
                  </span>
                  <button
                    className='bg-gray-100 text-gray-700 px-3 py-2 hover:bg-blue-100 transition font-bold'
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <button
                  className='bg-white rounded-full p-2 shadow hover:bg-blue-100 transition border border-blue-400'
                  onClick={() =>
                    click
                      ? removeFromWishlistHandler(data)
                      : addToWishlistHandler(data)
                  }
                  aria-label={
                    click ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                >
                  {click ? (
                    <AiFillHeart size={22} color='red' />
                  ) : (
                    <AiOutlineHeart size={22} color='blue' />
                  )}
                </button>
              </div>
              <button
                className='mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg py-3 shadow transition text-lg'
                onClick={() => addToCartHandler(data._id)}
                disabled={data.stock < 1}
              >
                <AiOutlineShoppingCart size={24} />{' '}
                {data.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
