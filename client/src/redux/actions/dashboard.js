import axios from 'axios';
import API_BASE_URL from '../../config/api';

// Get dashboard statistics
export const getDashboardStats =
  (period = '7') =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'DASHBOARD_STATS_REQUEST',
      });

      const { data } = await axios.get(
        `${API_BASE_URL}/dashboard/stats?period=${period}`,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: 'DASHBOARD_STATS_SUCCESS',
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: 'DASHBOARD_STATS_FAIL',
        payload:
          error.response?.data?.message || 'Failed to fetch dashboard stats',
      });
    }
  };

// Get real-time updates
export const getRealTimeUpdates = () => async (dispatch) => {
  try {
    dispatch({
      type: 'REALTIME_UPDATES_REQUEST',
    });

    const { data } = await axios.get(`${API_BASE_URL}/dashboard/realtime`, {
      withCredentials: true,
    });

    dispatch({
      type: 'REALTIME_UPDATES_SUCCESS',
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: 'REALTIME_UPDATES_FAIL',
      payload:
        error.response?.data?.message || 'Failed to fetch real-time updates',
    });
  }
};

// Clear dashboard errors
export const clearDashboardErrors = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_DASHBOARD_ERRORS',
  });
};
