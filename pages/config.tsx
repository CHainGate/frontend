import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import {Alert, Button, CircularProgress, Grid, Paper, TextField} from "@mui/material";
import { LoginRequestDto, LoginApiArg, useLoginMutation} from '../api/chaingate.generated';
import {useState} from "react";
import logo from '../public/CHainGate_inverted.svg';
import Image from 'next/image'

const Configuration: NextPage = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [
        login, // This is the mutation trigger
        { isLoading, error } // This is the destructured mutation result
    ] = useLoginMutation()

    const handleChange = ({
                              target: { name, value },
                          }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev: LoginRequestDto) => ({ ...prev, [name]: value }));

    const handleLogin = async () => {
        try {
            let loginArg: LoginApiArg = { loginRequestDto: {
                    email: "string",
                    password: "string",
                }
            }
            await login(loginArg).unwrap()
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
            <form onSubmit={handleLogin} className="login-form">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Box className="login-form-logo-container" my={2}>
                        <Image height={142} width={230} src={logo} alt="Logo exRap" className="logo" />
                    </Box>
                    <Box my={2}>
                        {content}
                    </Box>
                    <Box my={2} width="100%">
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Login
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Container>
    )
};

export default Configuration;