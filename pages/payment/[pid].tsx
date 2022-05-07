import * as React from 'react';
import type { NextPage } from 'next';
import {
    Checkbox, CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";

import styles from "../../styles/Payment.module.scss"

export const isBrowser = typeof window !== "undefined";

type SocketMessage = {
    type: string
    data: any
}

const Payment: NextPage = () =>  {
    const router = useRouter()
    const { pid } = router.query
    const initialStage: SocketMessage = {type: "received-tx", data: {}}
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

    let body = <CircularProgress />

    if(stage) {
        switch (stage.type) {
            case "loading":
                body = <CircularProgress />
                break
            case "currencies":
                body = (
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
                )
                break
            case "received-tx":
                body = (
                    // https://codepen.io/scottloway/pen/zqoLyQ
                    <div className={styles.loader}>
                        <div className={`${styles.checkmark} ${styles.draw}`}></div>
                    </div>
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
                debugger
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
{/*                <Typography variant="h3" gutterBottom>
                    Select cryptocurrency
                </Typography>*/}
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