import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../slices/articleSlice';  // Import the default export

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});
