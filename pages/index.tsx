import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '@mui/material';
import {useRouter} from "next/router";
import Head from "next/head";

const Home: NextPage = () =>  {
    const router = useRouter();
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