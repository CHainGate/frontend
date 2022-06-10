import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '@mui/material';
import {useRouter} from "next/router";
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
      </Container>);
}

export default Home;