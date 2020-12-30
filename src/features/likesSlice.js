import { createSlice } from '@reduxjs/toolkit';

export const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: [],
  },
  reducers: {
    displayLikes: (state, action) => {
      state.likes = action.payload
    },
    hideLikes: (state) => {
      state.likes  = []
    },
  },
});

export const { displayLikes, hideLikes } = likesSlice.actions

export const selectLikes = (state) => state.likes.likes

export default likesSlice.reducer
