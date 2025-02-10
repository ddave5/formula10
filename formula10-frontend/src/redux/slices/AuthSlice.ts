import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/axios';
import { getToken, setToken } from '../../services/tokenService';

interface AuthState {
    token: string | null;
    user: { name: string; role: string } | null;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { usernameOrEmail: string; password: string, rememberMe: boolean}, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/users/login', {
                usernameOrEmail: credentials.usernameOrEmail,
                password: credentials.password
            });

            const token = response.data; // JWT token

            // Token tárolása a "Remember Me" alapján
            setToken(token, credentials.rememberMe);

            return token; // Ebből a JWT token jön vissza
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('Unexpected error occurred.');
            }
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
        loadUserFromStorage: (state) => {
            const token = getToken();
            if (token) {
                state.token = token;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;