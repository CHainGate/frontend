import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import {Button} from "@mui/material";

const Home: NextPage = () => {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    MUI v5 + Next.js with TypeScript example
                </Typography>
                <Button variant="contained">Hello World</Button>
                <Link href="/about" color="secondary">
                    Go to the about page
                </Link>
            </Box>
        </Container>
    );
};

export default Home;