import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { chaingateApi } from '../baseApi';

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

export type Mode = {
    mode: "main" | "test";
};

const initialState: AuthInfo = {
    username: '',
    userid: 0,
    token: '',
    roles: '',
    isAuthenticated: false,
}

const mode: Mode = {
    mode: "main"
}

const userSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { username, token } }: PayloadAction<AuthInfo>) => {
            // TODO JWT token has only iss and exp currently
            const decodedToken: JWTTokenData = jwt_decode(token);
            state.username = username;
            state.userid = parseInt(decodedToken.nameid, 10);
            state.token = token;
            state.roles = decodedToken.role;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
        },
        clearUser: () => {
            localStorage.removeItem('token');
        },
    },
});

const modeSlice = createSlice({
    name: 'mode',
    initialState: mode,
    reducers: {
        changeMode: (state) => {
            let newMode: "test" | "main";
            if (state.mode === "test") {
                newMode = "main";
            } else {
                newMode = "test";
            }
            state.mode = newMode;
        },
    },
});

const reducer = combineReducers({
    authInfo: userSlice.reducer,
    mode: modeSlice.reducer
});


export const {
    setCredentials,
    clearUser,
} = userSlice.actions;

export const {
    changeMode,
} = modeSlice.actions;

export default reducer;


