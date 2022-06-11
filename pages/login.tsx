import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Alert, Button, CircularProgress, Grid, TextField} from "@mui/material";
import { LoginRequestDto, LoginApiArg, useLoginMutation} from '../api/chaingate.generated';
import {useState} from "react";
import logo from '../public/CHainGate_inverted.svg';
import Image from 'next/image'
import { setCredentials } from "../lib/authInfo/reducers";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";

const Login: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { isLoading, error }] = useLoginMutation();
    const authInfo = useAppSelector((state) => state.internal.authInfo);

    if (authInfo.isAuthenticated) {
        router.push('/dashboard');
    }

    const handleChange = ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev: LoginRequestDto) => ({ ...prev, [name]: value }));

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            let loginArg: LoginApiArg = {
                loginRequestDto: {
                    email: formState.email,
                    password: formState.password,
                }
            }

            const response = await login(loginArg).unwrap()

            dispatch(setCredentials(response.token));
            router.push('/dashboard');
        } catch {

        }
    }

    let content = (
        <>
            {error && <Box mb={2}><Alert severity="error">Login fehlgeschlagen! Bitte überprüfen sie Ihre Eingaben.</Alert></Box>}
            <TextField value={formState.email} id="email" name="email" label="email" type="text" fullWidth variant="standard" required onChange={handleChange} />
            <TextField id="password" name="password" label="Password" type="password" fullWidth variant="standard" required onChange={handleChange} />
        </>
    );

    if (isLoading) {
        content = <CircularProgress />;
    }

    return (
        <Container maxWidth="sm">
            <Head>
                <title>Login</title>
                <meta property="og:title" content="Login" key="title" />
            </Head>
            <form onSubmit={handleLogin} className="login-form">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Box className="login-form-logo-container">
                        <Image height={142} width={230} src={logo} alt="Logo exRap" className="logo" />
                    </Box>
                    <Box my={2} width={"100%"}>
                        {content}
                    </Box>
                    <Box my={2} width={"100%"}>
                        <Button type="submit" color="primary" variant="contained" fullWidth sx={{marginBottom: 1}}>
                            Login
                        </Button>
                        <Link href='/register' passHref>
                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                Register
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </form>
        </Container>
    )
};

export default Login;