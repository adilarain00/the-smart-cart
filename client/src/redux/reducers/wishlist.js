// Redux reducer for managing wishlist state (add/remove items)
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  wishlist: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // Add item to wishlist or update if it exists
    .addCase('addToWishlist', (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) =>
            i._id === isItemExist._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    })
    // Remove item from wishlist by ID
    .addCase('removeFromWishlist', (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i._id !== action.payload),
      };
    });
});
