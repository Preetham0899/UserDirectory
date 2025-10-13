import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/users');
  return response.data;
});

// Add user
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await axios.post('/users', newUser);
  return response.data;
});

//  Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  // JSONPlaceholder doesn’t actually delete but returns success, so we simulate.
  await axios.delete(`/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = { ...action.payload, id: state.data.length + 1 };
        state.data.unshift(newUser);
      })

      //  Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
