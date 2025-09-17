import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { productPlaceholderImg } from '../../assets';

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCartVisible(true), 10);
  }, []);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const handleClose = () => {
    setCartVisible(false);
    setTimeout(() => setOpenCart(false), 350);
  };

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-30 transition-opacity duration-300'>
      <div
        className={`fixed top-0 right-0 h-full w-[90%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-2xl border-l-4  transition-transform duration-300 ${
          cartVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        {cart && cart.length === 0 ? (
          <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex w-full justify-end pt-5 pr-5 fixed top-3 right-3'>
              <RxCross1
                size={25}
                className='cursor-pointer text-red-600 hover:text-red-700 transition hover:rotate-180'
                onClick={handleClose}
              />
            </div>
            <h5 className='text-gray-600'>Cart is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className='flex w-full justify-end pt-5 pr-5'>
                <RxCross1
                  size={25}
                  className='cursor-pointer text-red-600 hover:text-red-700 transition hover:rotate-180'
                  onClick={handleClose}
                />
              </div>
              <div className='flex items-center gap-2 p-4 border-b border-gray-100'>
                <IoBagHandleOutline size={25} className='text-blue-700' />
                <h5 className='text-[20px] font-semibold text-gray-800'>
                  {cart && cart.length} items
                </h5>
              </div>
              <div className='w-full'>
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className='px-5 mb-4'>
              <Link to='/cart/checkout'>
                <div className='h-[45px] flex items-center justify-center w-full transition rounded-[5px] shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100'>
                  <h1 className='text-white text-[18px] font-semibold'>
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error('Product stock limited!');
    } else {
      setValue(value + 1);
      const updatecart = { ...data, qty: value + 1 };
      quantityChangeHandler(updatecart);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updatecart = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updatecart);
  };

  return (
    <div className='flex items-center gap-4  p-4 mb-4 border border-gray-200 relative'>
      <div className='flex-shrink-0 flex items-center justify-center w-24 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-200'>
        <img
          src={`${data?.images[0]?.url}`}
          alt={data.name}
          className='w-20 h-20 max-w-full max-h-full object-contain bg-white'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = productPlaceholderImg;
          }}
        />
      </div>
      <div className='flex-1 flex flex-col justify-between w-full'>
        <div className='flex flex-row items-center justify-between gap-2'>
          <h2 className='font-semibold text-gray-800 text-sm' title={data.name}>
            {data.name.length > 30 ? data.name.slice(0, 30) + '...' : data.name}
          </h2>
          <button
            className=' transition hover:rotate-180 text-red-600 hover:text-red-700'
            onClick={() => removeFromCartHandler(data)}
            title='Remove'
          >
            <RxCross1 size={22} />
          </button>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <span className='text-black font-bold text-base'>
            ${data.discountPrice}
          </span>
          <span className='text-gray-400 text-sm'>x {value}</span>
        </div>
        <div className='flex items-center gap-2 mt-3'>
          <button
            className='bg-gray-200 hover:bg-gray-300 hover:from-blue-600 hover:to-purple-700 text-gray-800 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition '
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={18} />
          </button>
          <span className='font-semibold text-gray-700 text-base'>{value}</span>
          <button
            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white rounded-full w-8 h-8 flex items-center justify-center transition hover:rotate-180'
            onClick={() => increment(data)}
          >
            <HiPlus size={20} />
          </button>
        </div>
        <span className='text-gray-800  font-bold text-md mt-4 block sm:mt-2'>
          US ${totalPrice}
        </span>
      </div>
    </div>
  );
};

export default Cart;
