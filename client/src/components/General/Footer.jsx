import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillPinterest,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from '../../static/data';

const Footer = () => {
  return (
    <div className='bg-gradient-to-b max-w-[1500px] mx-auto from-[#0a131e] to-[#010b1a] text-white'>
      <div className='flex flex-wrap gap-y-8 gap-x-4 sm:gap-x-8 px-2 sm:px-12 py-14'>
        <div className='flex flex-col items-center sm:items-start lg:col-span-2 min-w-[200px] max-w-xl flex-1'>
          <div className='lg:col-span-2'>
            <h1 className='text-2xl font-bold mb-6'>The Start Cart 🛒</h1>
            <p className='text-gray-300 mb-6 leading-relaxed max-w-md'>
              Your trusted multivendor marketplace connecting quality sellers
              with discerning buyers. Discover unique products, support local
              businesses, and enjoy secure shopping with fast delivery across
              all categories.
            </p>
          </div>

          <div className='flex space-x-4 mt-4'>
            <a href='/' target='_blank' aria-label='Facebook' className='group'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-105 group-hover:-translate-y-2 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300'>
                <AiFillFacebook
                  size={20}
                  className='text-white hover:from-blue-600 hover:to-purple-700  hover:text-gray-300'
                />
              </div>
            </a>
            <a href='/' target='_blank' aria-label='Twitter' className='group'>
              <div className='w-10 h-10 bg-gradient-to-r group-hover:scale-105 group-hover:-translate-y-2 from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-all duration-300'>
                <AiOutlineTwitter
                  size={20}
                  className='text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-300'
                />
              </div>
            </a>
            <a href='/' target='_blank' aria-label='LinkedIn' className='group'>
              <div className='w-10 h-10 bg-gradient-to-r group-hover:scale-105 group-hover:-translate-y-2 from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-all duration-300'>
                <AiFillLinkedin
                  size={20}
                  className='text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-300'
                />
              </div>
            </a>
            <a href='/' target='_blank' aria-label='YouTube' className='group'>
              <div className='w-10 h-10 bg-gradient-to-r group-hover:scale-105 group-hover:-translate-y-2 from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-all duration-300'>
                <AiFillYoutube
                  size={20}
                  className='text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-300'
                />
              </div>
            </a>
            <a
              href='/'
              target='_blank'
              aria-label='Pinterest'
              className='group'
            >
              <div className='w-10 h-10 bg-gradient-to-r group-hover:scale-105 group-hover:-translate-y-2 from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-all duration-300'>
                <AiFillPinterest
                  size={20}
                  className='text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-300'
                />
              </div>
            </a>
          </div>
        </div>

        <div className='flex flex-col items-center sm:items-start min-w-[180px] flex-shrink-0 sm:pr-2'>
          <h3 className='text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text'>
            Company
          </h3>
          <ul className='space-y-2'>
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className='text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 duration-300 text-sm cursor-pointer leading-6 transition-colors'
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col items-center sm:items-start min-w-[180px] flex-shrink-0 sm:pr-2'>
          <h3 className='text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text'>
            Shop
          </h3>
          <ul className='space-y-2'>
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className='text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 duration-300 text-sm cursor-pointer leading-6 transition-colors'
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col items-center sm:items-start min-w-[180px] flex-shrink-0'>
          <h3 className='text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text'>
            Support
          </h3>
          <ul className='space-y-2'>
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className='text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 duration-300 text-sm cursor-pointer leading-6 transition-colors'
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-800 py-5 px-6'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
          <div className='text-center lg:text-left'>
            <span className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} The Smart Cart. All rights reserved
              worldwide.
            </span>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-5'>
            <div className='flex flex-row items-center gap-6'>
              <p className='text-gray-400 text-sm'>Secure Payment Methods</p>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center'>
                  <span className='text-xs text-gray-300'>VISA</span>
                </div>
                <div className='w-8 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center'>
                  <span className='text-xs text-gray-300'>MC</span>
                </div>
                <div className='w-8 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center'>
                  <span className='text-xs text-gray-300'>PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
