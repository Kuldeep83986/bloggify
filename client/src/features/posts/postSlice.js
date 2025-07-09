// src/features/posts/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:8080/api/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    singlePost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singlePost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default postSlice.reducer;
