import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitorCount, addVisitor } from '../../redux/actions/visitor';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  getDashboardStats,
  getRealTimeUpdates,
} from '../../redux/actions/dashboard';
import DashboardLoader from '../General/DashboardLoader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, trends, loading, error } = useSelector(
    (state) => state.dashboard
  );
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [autoRefresh] = useState(true);

  useEffect(() => {
    dispatch(getDashboardStats(selectedPeriod));
  }, [dispatch, selectedPeriod]);

  // Track and fetch visitor count
  useEffect(() => {
    dispatch(addVisitor());
    dispatch(getVisitorCount());
  }, [dispatch]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      dispatch(getRealTimeUpdates()).then(() => {
        dispatch(getDashboardStats(selectedPeriod));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, autoRefresh, selectedPeriod]);

  useEffect(() => {
    dispatch(getRealTimeUpdates()).then(() => {
      dispatch(getDashboardStats(selectedPeriod));
    });
  }, [dispatch, selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const revenueChartData = {
    labels: trends.labels || [],
    datasets: [
      {
        label: 'Revenue ($)',
        data: trends.revenue || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersChartData = {
    labels: trends.labels || [],
    datasets: [
      {
        label: 'Orders',
        data: trends.orders || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  // Revenue chart: auto-scale y-axis
  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  };

  // Orders chart: y-axis 0-30
  const ordersChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5,
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  };

  if (loading && !stats.revenue) {
    return <DashboardLoader />;
  }

  return (
    <div className=' bg-gray-50 py-5'>
      <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
          <div className='flex items-center space-x-4 mb-3'>
            <h1 className='text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
              Website Analytics
            </h1>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-600'>Live Updates</span>
            </div>
          </div>
          <div className='flex space-x-2'>
            {[
              { key: '7', label: 'Last 7 days' },
              { key: '30', label: 'Last 30 days' },
              { key: '90', label: 'Last 90 days' },
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => handlePeriodChange(period.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPeriod === period.key
                    ? 'bg-black text-white shadow-lg shadow-black/25 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:text-gray-100'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className='flex flex-wrap justify-center items-center gap-4 mb-8'>
          {[
            {
              title: 'Total Orders',
              value: stats.orders?.toLocaleString() || '0',
              icon: (
                <svg
                  className='w-9 h-9 text-fuchsia-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  />
                </svg>
              ),
            },
            {
              title: 'New Users',
              value: stats.customers?.toLocaleString() || '0',
              icon: (
                <svg
                  className='w-9 h-9 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              ),
            },
            {
              title: 'Total Products',
              value: stats.products?.toLocaleString() || '0',
              icon: (
                <svg
                  className='w-9 h-9 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                  />
                </svg>
              ),
            },
            {
              title: 'Active Events',
              value: stats.activeEvents?.toLocaleString() || '0',
              icon: (
                <svg
                  className='w-9 h-9 text-fuchsia-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              ),
            },
          ].map((stat, index) => (
            <div
              key={index}
              className='flex flex-1 min-w-[220px] max-w-xs bg-white rounded-xl shadow-sm border border-gray-100 p-5 items-center justify-between hover:shadow-md transition-all duration-200'
              style={{ flexBasis: '200px' }}
            >
              <div className='flex items-center gap-2'>
                {stat.icon}
                <h3 className='text-base font-medium text-gray-700'>
                  {stat.title}
                </h3>
              </div>
              <div className='text-2xl font-bold text-gray-900 text-right mt-1'>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Revenue Chart */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Revenue Trend
            </h3>
            <div className='h-56'>
              {trends.labels && trends.labels.length > 0 ? (
                <Line data={revenueChartData} options={revenueChartOptions} />
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No data available for selected period
                </div>
              )}
            </div>
          </div>

          {/* Orders Chart */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Orders Trend
            </h3>
            <div className='h-56'>
              {trends.labels && trends.labels.length > 0 ? (
                <Line data={ordersChartData} options={ordersChartOptions} />
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No data available for selected period
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
