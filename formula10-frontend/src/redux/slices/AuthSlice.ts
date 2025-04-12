import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/axios';
import { getToken, setToken } from '../../services/token.service';
import eventBus from '../../services/eventBus';

interface AuthState {
    token: string | null;
    user: { id: number; username: string; email: string; role: string; } | null;
    error: string | null;
    loading: boolean
}

const initialState: AuthState = {
    token: null,
    user: null,
    error: null,
    loading: true
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { usernameOrEmail: string; password: string, rememberMe: boolean}, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/users/login', {
                usernameOrEmail: credentials.usernameOrEmail,
                password: credentials.password,
                rememberMe: credentials.rememberMe
            });

            const { token, userDTO: user} = response.data; // JWT token

            setToken(token, credentials.rememberMe);

            return { token, user }; 
        } catch (error: any) {
            eventBus.emit('error', {message: 'Login Failed!'});
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('Unexpected error occurred.');
            }
        }
    }
);

export const loadUserFromStorage = createAsyncThunk(
    'auth/loadUserFromStorage',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (token) {
                const response = await apiClient.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return { token, user: response.data };
            } else {
                return rejectWithValue('No token found');
            }
        } catch (error: any) {
            return rejectWithValue('Failed to load user');
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
            state.loading = false
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user; // A felhasználói adatok mentése a Redux állapotba
                state.error = null;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
            })
            .addCase(loadUserFromStorage.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false; // Betöltés befejeződött, de hiba történt
                state.token = null;
                state.user = null;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;