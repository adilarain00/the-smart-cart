import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { deleteEvent, getAllSellerEvents } from '../../../redux/actions/event';
import Loader from '../../General/Loader';

const SellerDashboardEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, events } = useSelector((state) => state.events);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllSellerEvents(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  return isLoading ? (
    <div className='flex items-center justify-center min-h-screen'>
      <Loader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='block md:hidden space-y-4'>
        {!events || events.length === 0 ? (
          <div className='bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-lg p-8 text-center'>
            <p className='text-gray-500 text-lg'>No events found.</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className='bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-lg p-4'
            >
              <div className='space-y-3'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>
                      Event ID
                    </p>
                    <p className='text-sm text-gray-600 break-all'>
                      {event._id}
                    </p>
                  </div>
                  <button
                    className='bg-gradient-to-r from-blue-500 to-purple-600  hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white rounded-lg p-2 transition'
                    title='Preview'
                    onClick={() =>
                      navigate(`/product/${event._id}?isEvent=true`)
                    }
                  >
                    <AiOutlineEye size={16} />
                  </button>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>Name</p>
                    <p className='text-sm text-gray-600 break-all'>
                      {event.name}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>Price</p>
                    <p className='text-sm text-gray-600'>
                      {event.discountPrice
                        ? `$${event.discountPrice}`
                        : event.originalPrice
                        ? `$${event.originalPrice}`
                        : '-'}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>
                      Sold Out
                    </p>
                    <p className='text-sm text-gray-600'>
                      {event.soldOut || 0}
                    </p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button
                    className='bg-red-500 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white rounded-lg p-2 transition-colors duration-200'
                    title='Delete'
                    onClick={() => handleDelete(event._id)}
                  >
                    <AiOutlineDelete size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='hidden md:block overflow-x-auto shadow-[0_0_20px_rgba(0,0,0,0.05)] rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-800 text-white rounded-lg'>
            <tr>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                ID
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                Name
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                Price
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                Sold Out
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                Preview
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium uppercase tracking-wider'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {!events || events.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='px-4 lg:px-6 py-8 text-center text-gray-500 text-lg'
                >
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event._id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td
                    className='px-4 lg:px-6 py-3 text-sm text-gray-900 max-w-xs truncate'
                    title={event._id}
                  >
                    {event._id}
                  </td>
                  <td className='px-4 lg:px-6 py-3 text-sm text-gray-900'>
                    {event.name}
                  </td>
                  <td className='px-4 lg:px-6 py-3 text-sm text-gray-900'>
                    {event.discountPrice
                      ? `$${event.discountPrice}`
                      : event.originalPrice
                      ? `$${event.originalPrice}`
                      : '-'}
                  </td>
                  <td className='px-4 lg:px-6 py-3 text-sm text-gray-900'>
                    {event.soldOut || 0}
                  </td>
                  <td className='px-4 lg:px-6 py-3'>
                    <button
                      className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white rounded-lg p-2 transition-colors duration-200'
                      title='Preview'
                      onClick={() =>
                        navigate(`/product/${event._id}?isEvent=true`)
                      }
                    >
                      <AiOutlineEye size={18} />
                    </button>
                  </td>
                  <td className='px-4 lg:px-6 py-3'>
                    <button
                      className='bg-red-500 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 text-white rounded-lg p-2 transition-colors duration-200'
                      title='Delete'
                      onClick={() => handleDelete(event._id)}
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboardEvents;
