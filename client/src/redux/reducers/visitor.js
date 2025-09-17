const initialState = {
  count: 0,
  loading: false,
  error: null,
};

export const visitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VISITOR_COUNT_REQUEST':
      return { ...state, loading: true };
    case 'GET_VISITOR_COUNT_SUCCESS':
      return { ...state, loading: false, count: action.payload };
    case 'GET_VISITOR_COUNT_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
