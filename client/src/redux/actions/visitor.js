import axios from 'axios';
import API_BASE_URL from '../../config/api';

// Get visitor count
export const getVisitorCount = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_VISITOR_COUNT_REQUEST' });

    const { data } = await axios.get(`${API_BASE_URL}/visitors/count`);

    dispatch({ type: 'GET_VISITOR_COUNT_SUCCESS', payload: data.count });
  } catch (error) {
    dispatch({
      type: 'GET_VISITOR_COUNT_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add visitor
export const addVisitor = () => async () => {
  try {
    await axios.post(`${API_BASE_URL}/visitors/add`);
  } catch (error) {
    // ignore tracking errors
  }
};
