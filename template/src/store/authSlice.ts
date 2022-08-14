import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import authClient from '../services/authClient';

export type User = {
  id: number;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'failed';
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (authorizationCode: string) => {
    return authClient.getToken(authorizationCode);
  },
);

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    signout(state) {
      state.user = null;
      state.token = null;
      state.status = 'unauthenticated';
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchToken.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.status = 'authenticated';
      state.user = action.payload.usuario;
      state.token = action.payload.token;
    });

    builder.addCase(fetchToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Authentication error';
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { signout } = authSlice.actions;

export default authSlice.reducer;
