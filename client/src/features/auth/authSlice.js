// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Safe JSON parse helper
function safeParseJSON(item) {
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}

// Load user from localStorage safely
const storedUser = safeParseJSON(localStorage.getItem('user'));

const initialState = {
  user: storedUser || null,
  token: storedUser?.token || null,
  loading: false,
  error: null,
};

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Register failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(
          'user',
          JSON.stringify({ ...action.payload.user, token: action.payload.token })
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(
          'user',
          JSON.stringify({ ...action.payload.user, token: action.payload.token })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
