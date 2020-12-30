import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import likesReducer from '../features/likesSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    likes: likesReducer
  },
});
