import * as React from 'react';
import type { NextPage } from 'next';
import {
    Button,
    Chip, CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import {useRouter} from "next/router";
import DoneIcon from '@mui/icons-material/Done';
import {useCallback, useEffect, useState} from "react";

import styles from "../../styles/Payment.module.scss"

export const isBrowser = typeof window !== "undefined";

type SocketMessage = {
    messageType: string
    body: any
}

const Payment: NextPage = () =>  {
    const router = useRouter()
    const { pid } = router.query
    const initialStage: SocketMessage = {messageType: "loading", body: {}}
    const [formValues, setFormValues] = useState({})
    const [wsInstance, setWsInstance] = useState(null as unknown as WebSocket | null);
    const [stage, setStage] = useState(initialStage);

// Call when updating the ws connection
    const updateWs = useCallback((url) => {
        if(!isBrowser) return setWsInstance(null);

        // Close the old connection
        if(wsInstance?.readyState !== 3)
            wsInstance?.close();

        // Create a new connection
        const newWs = new WebSocket(url);
        setWsInstance(newWs);
    }, [wsInstance])

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(formValues);
        const currencySelection: SocketMessage = {
            messageType: 'currency-selection',
            body: formValues
        }
        wsInstance?.send(JSON.stringify(currencySelection))
    };

    let body = <CircularProgress />

    if(stage) {
        switch (stage.messageType) {
            case "loading":
                body = <CircularProgress />
                break
            case "currency_selection":
                body = (
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Cryptocurrency</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="currency"
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="eth" control={<Radio />} label="ethereum" />
                                <FormControlLabel value="btc" control={<Radio />} label="bitcoin" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" type="submit">Absenden</Button>
                    </form>
            )
                break
            case "waiting":
                body = (
                    <>
                        <div className={styles.loader}>
                        </div>
                        <TextField id="standard-basic" label="Standard" variant="standard" value={"0x....."} />
                    </>
                )
                break
            case "paid":
                body = (
                    // https://codepen.io/scottloway/pen/zqoLyQ
                    <div className={`${styles.loader} ${styles["load-complete"]}`}>
                        <div className={`${styles.checkmark} ${styles.draw}`}></div>
                    </div>
                )
                break
            case "confirmed":
                body = (
                    <>
                        <div className={`${styles.loader} ${styles["load-complete"]}`}>
                            <div className={`${styles.checkmark} ${styles.draw}`}></div>
                        </div>
                        <Chip
                            label="confirmed"
                            deleteIcon={<DoneIcon />}
                        />
                    </>
                )
                break
            default:
                body = <strong>An error happened please contact.</strong>
        }
    }


// (Optional) Open a connection on mount
    useEffect(() => {
        let ws : WebSocket
        if(isBrowser && pid) {
            ws = new WebSocket(`ws://127.0.0.1:8000/ws?pid=${pid}`);
            ws.addEventListener('message', function (event) {
                setStage(JSON.parse(event.data))
                console.log('Message from server ', event.data);
            });
            setWsInstance(ws);
        }

        return () => {
            // Cleanup on unmount if ws wasn't closed already
            if(ws && ws?.readyState !== 3)
                ws.close()
        }
    }, [pid])


    return (
        <React.Fragment>
            <Grid className={'root'} container spacing={0} direction="column" alignItems="center" justifyContent="center" height={'100vh'} width={'100vw'}>
                {pid}
                <Typography variant="h3" gutterBottom>
                    Select cryptocurrency
                </Typography>
                <Grid container spacing={3} maxWidth="sm" className={styles.successCheckmark}>
                    <Grid item xs={12}>
                        {body}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Payment;