import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    try {
      if (
        typeof timeLeft.days === 'undefined' &&
        typeof timeLeft.hours === 'undefined' &&
        typeof timeLeft.minutes === 'undefined' &&
        typeof timeLeft.seconds === 'undefined'
      ) {
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/events/event/${data._id}`
        );
      }
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data?.message || 'Error deleting event.');
    }

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.finishDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className='flex gap-4 mt-6 justify-center'>
      {Object.keys(timeLeft).length ? (
        timeUnits.map(
          (unit, idx) =>
            unit.value !== undefined && (
              <div
                key={idx}
                className='relative flex flex-col items-center min-w-[68px]'
              >
                <div className='border-4 border-red-100 p-1 rounded-full mb-2'>
                  <div className='bg-white rounded-full flex items-center justify-center w-12 h-12'>
                    <span className='font-extrabold text-3xl text-red-600 tracking-tight'>
                      {unit.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <span className='mt-2 text-xs font-semibold uppercase tracking-widest text-red-600 drop-shadow'>
                  {unit.label}
                </span>
              </div>
            )
        )
      ) : (
        <span className='text-red-500 text-xl font-semibold'>Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
