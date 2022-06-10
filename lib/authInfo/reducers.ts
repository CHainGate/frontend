import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export type JWTTokenData = {
    firstName: string,
    iss: string,
    role: string,
    nbf: number,
    exp: number,
    iat: number
};

export type AuthInfo = {
    firstName: string;
    email: string;
    token: string;
    isAuthenticated: boolean;
};

export type Mode = {
    mode: "main" | "test";
};

const initialState: AuthInfo = {
    firstName: '',
    email: '',
    token: '',
    isAuthenticated: false,
}

const mode: Mode = {
    mode: "main"
}

const userSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setCredentials: (state, { payload }: PayloadAction<string>) => {
            const decodedToken: JWTTokenData = jwt_decode(payload);
            state.firstName = decodedToken.firstName;
            state.email = decodedToken.iss;
            state.token = payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', payload);
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
        setMode: (state, { payload }: PayloadAction<"main" | "test">) => {
            state.mode = payload;
        },
        changeMode: (state) => {
            let newMode: "test" | "main";
            if (state.mode === "test") {
                newMode = "main";
            } else {
                newMode = "test";
            }
            state.mode = newMode;
            localStorage.setItem('mode', newMode);
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
    setMode,
} = modeSlice.actions;

export default reducer;


