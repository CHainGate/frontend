import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider, EmotionCache } from '@emotion/react';
import {ThemeProvider} from "@mui/material/styles";
import theme from "../src/theme";
import {CssBaseline} from "@mui/material";
import Sidebar from "../src/Sidebar";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import PrivateRoute from '../src/PrivateRoute';
import {useRouter} from "next/router";



const { wrapper } = require("../lib/store");

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App(props : any) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const authInfo = useAppSelector((state) => state.authInfo);
    const router = useRouter()

    let comp;
    if (authInfo.isAuthenticated && !router.pathname.startsWith('/payment/')) {
        comp = <Sidebar />;
    } else {
        comp = <></>;
    }

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {comp}
                <PrivateRoute>
                  <Component {...pageProps} />
                </PrivateRoute>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default wrapper.withRedux(App);
