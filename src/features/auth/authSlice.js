import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';

export const handleStateInfoUser = createAsyncThunk(
  'auth/fetchAuth',
  async (userId) => {
    const doc = await db.collection('users').doc(userId).get();
    console.log(doc);
    return { id: userId, ...doc.data() };
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    is_loading: true,
    id: '',
    full_name: '',
    display_name: '',
    photoUrl: '',
    user_follower: [],
    user_following: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleStateInfoUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const {
        id,
        full_name,
        display_name,
        photoUrl,
        user_follower,
        user_following,
      } = action.payload;
      // state.id = id;
      // state.display_name = display_name;
      // state.full_name = full_name;
      // state.photoUrl = photoUrl;
      // state.is_loading = false;
      return {
        id,
        display_name,
        full_name,
        photoUrl,
        user_follower,
        user_following,
        is_loading: false,
      };
    });
  },
});

export default authSlice.reducer;
