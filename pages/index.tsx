import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '@mui/material';
import {useRouter} from "next/router";
import Head from "next/head";
import { useAppDispatch } from '../lib/hooks';
import { setMode } from '../lib/authInfo/reducers';

const Home: NextPage = () =>  {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const mode = localStorage.getItem("mode")
    if (mode === "test" || mode === "main") {
      dispatch(setMode(mode))
    }

    router.push('/dashboard');
    return (
      <Container>
          <Head>
              <title>Home</title>
              <meta property="og:title" content="Home" key="title" />
          </Head>
      </Container>);
}

export default Home;