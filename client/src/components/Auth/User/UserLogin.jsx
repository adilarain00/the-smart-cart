import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success('User Logged in successful.');
        navigate('/');
        window.location.reload(true);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-8 shadow-[0_0_20px_rgba(0,0,0,0.05)]'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-base font-semibold text-gray-800 mb-1'
              >
                Email <span className='text-blue-600'>*</span>
              </label>
              <div>
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  required
                  placeholder='abc@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-base font-semibold text-gray-800 mb-1'
              >
                Password <span className='text-blue-600'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={visible ? 'text' : 'password'}
                  name='password'
                  autoComplete='current-password'
                  required
                  placeholder='•••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg'
                />
                {visible ? (
                  <AiOutlineEye
                    className='absolute right-3 top-3 cursor-pointer text-gray-400'
                    size={22}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className='absolute right-3 top-3 cursor-pointer text-gray-400'
                    size={22}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <span className='ml-2 block text-sm text-gray-800 font-medium'>
                  Remember me
                </span>
              </label>
            </div>
            <div>
              <button
                type='submit'
                className='w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-lg rounded-lg font-semibold tracking-wide transition flex items-center justify-center'
              >
                Signin
              </button>
            </div>
            <div className='flex gap-4 mt-4'>
              <Link
                to='/user/register'
                className='w-1/2 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white text-base text-center rounded-lg font-semibold transition'
              >
                Create account
              </Link>
              <Link
                to='/user/forgot-password'
                className='w-1/2 py-2 bg-gray-200 text-gray-700 text-base text-center rounded-lg font-semibold hover:bg-gray-300 transition'
              >
                Forget password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
