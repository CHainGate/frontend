import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export type JWTTokenData = {
    name: string,
    nameid: string,
    role: string,
    nbf: number,
    exp: number,
    iat: number
};

export type AuthInfo = {
    username: string;
    userid?: number;
    token: string;
    roles?: string;
    isAuthenticated: boolean;
};

const initialState: AuthInfo = {
    username: '',
    userid: 0,
    token: '',
    roles: '',
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { username, token } }: PayloadAction<AuthInfo>) => {
            const decodedToken: JWTTokenData = jwt_decode(token);
            state.username = username;
            state.userid = parseInt(decodedToken.nameid, 10);
            state.token = token;
            state.roles = decodedToken.role;
            state.isAuthenticated = true;
            sessionStorage.setItem('token', token);
        },
        clearUser: () => {
            sessionStorage.clear();
        },
    },
});

export const {
    setCredentials,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;


