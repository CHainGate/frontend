import { NextPage } from 'next';
import { Alert, CircularProgress, Container } from '@mui/material';
import { useVerifyEmailQuery, VerifyEmailApiArg } from '../api/chaingate.generated';
import { useRouter } from 'next/router';
import * as React from 'react';
import Box from '@mui/material/Box';

const VerifyEmail: NextPage = () => {
  const router = useRouter();
  const email = router.query.email as string;
  const verificationCode = router.query.code as string;

  const args: VerifyEmailApiArg = {
      email,
      verificationCode: parseInt(verificationCode, 10)
    }

  const { isLoading, isError} = useVerifyEmailQuery(args)

  let content = (
    <>
      {isError
        ? <Box mb={2}><Alert severity="error">Verification failed</Alert></Box>
        : <p>E-mail successfully verified</p>
      }
    </>
  );

  if (isLoading) {
    content = <CircularProgress />;
  }
  return (
    <Container>
      {content}
    </Container>
  )
}

export default VerifyEmail;