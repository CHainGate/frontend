import { NextPage } from 'next';
import { Alert, Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import logo from '../public/CHainGate_inverted.svg';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useState } from 'react';
import { RegisterMerchantApiArg, RegisterRequestDto, useRegisterMerchantMutation } from '../api/chaingate.generated';
import Link from "next/link";
import Head from "next/head";
import router from 'next/router';
import CopySnackbar from '../src/CopySnackbar';

const Register: NextPage = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState<boolean>(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [register, {error}] = useRegisterMerchantMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev: RegisterRequestDto) => ({ ...prev, [name]: value }));
  }


  const handleRegister = async (event: any) => {
    event.preventDefault();

    const  registerArg: RegisterMerchantApiArg = {
      registerRequestDto: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password
      }
    }
    await register(registerArg).unwrap()

    if (!error) {
      setIsSnackbarOpen(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  }

  let content = (
    <>
      {error && <Box mb={2}><Alert severity="error">Registration fehlgeschlagen! Bitte überprüfen sie Ihre Eingaben.</Alert></Box>}
      <TextField value={formState.firstName} id="firstName" name="firstName" label="First Name" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField value={formState.lastName} id="lastName" name="lastName" label="Last Name" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField value={formState.email} id="email" name="email" label="E-Mail" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField id="password" name="password" label="Password" type="password" fullWidth variant="standard" required onChange={handleChange} />
    </>
  );

  return (
    <>
      <Container maxWidth="sm">
        <Head>
          <title>Register</title>
          <meta property="og:title" content="Register" key="title" />
        </Head>
        <form onSubmit={handleRegister} className="register-form">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >

            <Box className="login-form-logo-container" marginTop={2}>
              <Image height={142} width={230} src={logo} alt="Logo exRap" className="logo" />
            </Box>
            <Box my={2}>
              {content}
            </Box>
            <Box my={2} width="100%">
              <Button type="submit" color="primary" variant="contained" fullWidth sx={{marginBottom: 1}}>
                Register
              </Button>
              <Link href='/login' passHref>
                <Button type="submit" color="primary" variant="contained" fullWidth>
                  Go To Login
                </Button>
              </Link>
            </Box>
          </Grid>
        </form>
      </Container>
      <CopySnackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} content={"Successfully registered."}></CopySnackbar>
    </>
  )
}

export default Register;