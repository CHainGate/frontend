import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '@mui/material';
import {useRouter} from "next/router";

const Home: NextPage = () =>  {
    const router = useRouter();
    router.push('/dashboard');
    return (
      <Container>
      </Container>);
}

export default Home;