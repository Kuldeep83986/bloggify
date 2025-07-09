// src/features/comments/commentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch comments for a specific post
export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchByPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comments/${postId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load comments');
    }
  }
);

// Add comment to a specific post (public route)
export const addCommentToPost = createAsyncThunk(
  'comments/addComment',
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/comments/${postId}`, commentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add comment');
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addCommentToPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
