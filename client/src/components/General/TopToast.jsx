import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TopToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // show toast every refresh
  }, []);

  if (!show) return null;

  return (
    <div className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 flex items-center justify-center relative z-50'>
      <p className='text-sm font-medium text-center'>
        🎉 Welcome to <span className='font-bold'>The Smart Cart</span> — Your
        smart shopping starts here!
      </p>
      <button
        onClick={() => setShow(false)}
        className='absolute right-4 text-white hover:text-gray-300'
      >
        <X size={18} />
      </button>
    </div>
  );
}
