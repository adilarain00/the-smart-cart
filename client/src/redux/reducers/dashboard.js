// Redux reducer for managing dashboard stats, trends, sales, and real-time data
const initialState = {
  stats: {
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
    activeEvents: 0,
    revenueChange: '0',
    ordersChange: '0',
    customersChange: '0',
    productsChange: '0',
  },
  trends: {
    labels: [],
    revenue: [],
    orders: [],
    customers: [],
    products: [],
  },
  salesByCategory: [],
  realTimeData: {
    recentOrders: [],
    recentCustomers: [],
    lowStockProducts: [],
  },
  loading: false,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle dashboard stats request
    case 'DASHBOARD_STATS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle dashboard stats success
    case 'DASHBOARD_STATS_SUCCESS':
      return {
        ...state,
        loading: false,
        stats: action.payload.stats,
        trends: action.payload.trends,
        salesByCategory: action.payload.salesByCategory,
        error: null,
      };

    // Handle dashboard stats failure
    case 'DASHBOARD_STATS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Handle real-time updates request
    case 'REALTIME_UPDATES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle real-time updates success
    case 'REALTIME_UPDATES_SUCCESS':
      return {
        ...state,
        loading: false,
        realTimeData: action.payload,
        error: null,
      };

    // Handle real-time updates failure
    case 'REALTIME_UPDATES_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear dashboard errors
    case 'CLEAR_DASHBOARD_ERRORS':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
