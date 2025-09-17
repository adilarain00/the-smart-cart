import axios from 'axios';

// Action to get user orders
export const getVisitorCount = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_VISITOR_COUNT_REQUEST' });
    const { data } = await axios.get('/api/visitors/count');
    dispatch({ type: 'GET_VISITOR_COUNT_SUCCESS', payload: data.count });
  } catch (error) {
    dispatch({ type: 'GET_VISITOR_COUNT_FAIL', payload: error.message });
  }
};

export const addVisitor = () => async () => {
  try {
    await axios.post('/api/visitors/add');
  } catch (error) {
    // Ignore errors for visitor tracking
  }
};
