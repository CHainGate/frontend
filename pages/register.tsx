import { NextPage } from 'next';
import { Alert, Button, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import logo from '../public/CHainGate_inverted.svg';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useState } from 'react';
import { RegisterMerchantApiArg, RegisterRequestDto, useRegisterMerchantMutation } from '../api/chaingate.generated';


const Register: NextPage = () => {
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [register, {isLoading, error}] = useRegisterMerchantMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(name, value)
    setFormState((prev: RegisterRequestDto) => ({ ...prev, [name]: value }));
  }


  const handleRegister = async (event: any) => {
    event.preventDefault();

    try {
      const  registerArg: RegisterMerchantApiArg = {
        registerRequestDto: {
          first_name: formState.first_name,
          last_name: formState.last_name,
          email: formState.email,
          password: formState.password
        }
      }
      const response = await register(registerArg).unwrap()
      console.log(response)
    } catch {

    }

  }

  let content = (
    <>
      {error && <Box mb={2}><Alert severity="error">Registration fehlgeschlagen! Bitte überprüfen sie Ihre Eingaben.</Alert></Box>}
      <TextField value={formState.first_name} id="first_name" name="first_name" label="First Name" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField value={formState.last_name} id="last_name" name="last_name" label="Last Name" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField value={formState.email} id="email" name="email" label="E-Mail" type="text" fullWidth variant="standard" required onChange={handleChange} />
      <TextField id="password" name="password" label="Password" type="password" fullWidth variant="standard" required onChange={handleChange} />
    </>
  );

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleRegister} className="register-form">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >

          <Box className="login-form-logo-container">
            <Image height={142} width={230} src={logo} alt="Logo exRap" className="logo" />
          </Box>
          <Box my={2}>
            {content}
          </Box>
          <Box my={2} width="100%">
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Register
            </Button>
          </Box>
        </Grid>
      </form>
    </Container>
  )
}

export default Register;