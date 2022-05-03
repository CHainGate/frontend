import * as React from 'react';
import type { NextPage } from 'next';
import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';

const Payment: NextPage = () =>  {
    return (
        <React.Fragment>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" height={'100vh'} width={'100vw'}>
                <Typography variant="h3" gutterBottom>
                    Select cryptocurrency
                </Typography>
                <Grid container spacing={3} maxWidth="sm">
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="eth" control={<Radio />} label="ethereum" />
                                <FormControlLabel value="btc" control={<Radio />} label="bitcoin" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Payment;