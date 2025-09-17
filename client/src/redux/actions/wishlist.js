// Action to manage wishlist items
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'addToWishlist',
    payload: data,
  });

  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

// Action to manage wishlist items
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'removeFromWishlist',
    payload: data._id,
  });
  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
