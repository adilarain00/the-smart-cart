// Action to add an item to the cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'addToCart',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

// Action to remove an item from the cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'removeFromCart',
    payload: data._id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};
