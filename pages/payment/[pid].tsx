import * as React from 'react';
import type { NextPage } from 'next';
import {
    Button,
    Chip, CircularProgress,
    Grid, IconButton, InputAdornment, OutlinedInput,
    Typography
} from '@mui/material';
import {useRouter} from "next/router";
import DoneIcon from '@mui/icons-material/Done';
import {useCallback, useEffect, useState} from "react";
import btc_logo from '../../public/bitcoin.svg';
import eth_logo from '../../public/ethereum.svg';

import styles from "../../styles/Payment.module.scss"
import Box from "@mui/material/Box";
import Image from "next/image";
import {useCountdown} from "../../src/Countdown";
import {useGetConfigQuery} from "../../api/chaingate.generated";
import BigNumber from "bignumber.js";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Head from "next/head";

export const isBrowser = typeof window !== "undefined";

type SocketMessage = {
    messageType: string
    body: {
        initialState:   boolean
        currency:       string
        payAddress:     string
        payAmount:      string
        expireTime:     string
        mode: 	        string
        successPageURL: string
        failurePageURL: string
    }
}


const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </div>
    );
};

const CountdownTimer = ({ targetDate }: any) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <span>expired</span>;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

const DateTimeDisplay = ({ value, isDanger }: any) => {
    return (
        <span className={isDanger ? 'countdown danger' : 'countdown'}>
            <span>{value}</span>
        </span>
    );
};

const ShowCounter = ({ minutes, seconds }: any) => {
    return (
        <div className="show-counter">
            <DateTimeDisplay value={minutes} isDanger={false} />:
            <DateTimeDisplay value={seconds} isDanger={false} />
        </div>
    );
};

const handleClickToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
};

function CurrencySelection(props: { onSubmit: (event: { preventDefault: () => void }) => void, formValues: { currency: string }, onClickETH: () => void, onClickBTC: () => void }) {
    return <Box>
        <Typography variant="h4" gutterBottom marginBottom={3} textAlign={"center"}>
            Choose your cryptocurrency...
        </Typography>
        <form onSubmit={props.onSubmit}>
            <Grid container marginBottom={5}>
                <Grid item xs={6}
                      className={`${props.formValues.currency === "eth" ? styles.currencyselected : ""} ` + styles.currency}
                      onClick={props.onClickETH}
                      padding={2}
                >
                    <Box>
                        <Image height={142} width={230} src={eth_logo} alt="Logo CHainGate" className="logo"/>
                    </Box>
                    <Box textAlign={"center"} marginTop={2} fontWeight={"bold"}>Ethereum</Box>
                </Grid>
                <Grid item xs={6}
                      className={`${props.formValues.currency === "btc" ? styles.currencyselected : ""} ` + styles.currency}
                      onClick={props.onClickBTC}
                      padding={2}
                >
                    <Box>
                        <Image height={142} width={230} src={btc_logo} alt="Logo CHainGate" className="logo"/>
                    </Box>
                    <Box textAlign={"center"} marginTop={2} fontWeight={"bold"}>Bitcoin</Box>
                </Grid>
            </Grid>
            <Button fullWidth variant="contained" type="submit">Absenden</Button>
        </form>
    </Box>;
}

function Waiting(props: { payAmount: BigNumber, stage: SocketMessage}) {
    return <Grid container alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
        <Grid item className={styles.loader}/>
        <Grid item marginBottom={5}>
            <Typography variant="h5">{props.payAmount.toString()} {props.stage.body.currency.toUpperCase()}</Typography>
        </Grid>
        <Grid item width={"100%"}>
            <OutlinedInput fullWidth label="address" value={props.stage.body.payAddress} endAdornment={
                <InputAdornment position="end">
                    <IconButton onClick={() => handleClickToClipboard(props.stage.body.payAddress)}>
                        {<ContentCopyIcon />}
                    </IconButton>
                </InputAdornment>
            }/>
        </Grid>
        <Grid item marginTop={2} textAlign='center'>
            <em>You <a href={getBlockExplorerURL(props.stage.body.payAddress, props.stage.body.currency, props.stage.body.mode)}>sent</a> your money and it recognizes it?</em>
            <br />
            <em>Please stay calm it gets rechecked before it expires.</em>
        </Grid>
        <Grid item>
            <a style={{textDecoration: 'underline'}} target='_blank' href={getBlockExplorerURL(props.stage.body.payAddress, props.stage.body.currency, props.stage.body.mode)} rel="noreferrer">(Check Block Explorer)</a>
        </Grid>
    </Grid>;
}

function getBlockExplorerURL(address: string, currency: string,  mode: string) {
    if(currency == 'eth') {
        if (mode == 'test') {
            return `https://rinkeby.etherscan.io/address/` + address
        } else {
            return `https://etherscan.io/address/` + address
        }
    } else {
        if (mode == 'test') {
            return `https://www.blockchain.com/btc-testnet/address/` + address
        } else {
            return `https://www.blockchain.com/btc/address/` + address
        }
    }
}
function Paid(props: {stage: SocketMessage}) {
    useEffect(() => {
        if (!props.stage.body.initialState) {
            setTimeout(() => {window.location.href = props.stage.body.successPageURL;}, 5000);
        }
    }, [props.stage]);
    return <Box display='flex' flexDirection='column' alignItems={'center'}><div className={`${styles.loader} ${styles["load-complete"]}`}>
                <div className={`${styles.checkmark} ${styles.draw}`}></div>
            </div>
        <div>Waiting to be confirmed...</div>
        <Button href={props.stage.body.successPageURL}>Back to the merchant</Button>
    </Box>;
}

function Confirmed(props: {stage: SocketMessage}) {
    return <Box alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"}>
        <Box className={`${styles.loader} ${styles["load-complete"]}`}>
            <div className={`${styles.checkmark} ${styles.draw}`}></div>
            <Chip
                className={styles.chip}
                color="success"
                label="confirmed"
                deleteIcon={<DoneIcon/>}
            />
        </Box>
        <Button href={props.stage.body.successPageURL}>Back to the merchant</Button>
    </Box>;
}

function Expired(props: {stage: SocketMessage}) {
    useEffect(() => {
        if (!props.stage.body.initialState) {
            setTimeout(() => {window.location.href = props.stage.body.failurePageURL;}, 5000);
        }
    }, [props.stage]);

    return <Box alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"}>
        <Box className={`${styles.loader} ${styles["load-complete"]} ${styles.cross}`}>
            <div className={`${styles.crossline} ${styles.crosslineleft} ${styles.draw}`}></div>
            <div className={`${styles.crossline} ${styles.crosslineright} ${styles.draw}`}></div>
            <Chip
                className={styles.chip}
                color="error"
                label="expired"
                deleteIcon={<DoneIcon/>}
            />
        </Box>
        <Button href={props.stage.body.failurePageURL}>Back to the merchant</Button>
    </Box>;
}

function Failed(props: {stage: SocketMessage}) {
    useEffect(() => {
        if (!props.stage.body.initialState) {
            setTimeout(() => {window.location.href = props.stage.body.failurePageURL;}, 5000);
        }
    }, [props.stage]);

    return <Box alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"}>
        <Box className={`${styles.loader} ${styles["load-complete"]} ${styles.cross}`}>
            <div className={`${styles.crossline} ${styles.crosslineleft} ${styles.draw}`}></div>
            <div className={`${styles.crossline} ${styles.crosslineright} ${styles.draw}`}></div>
            <Chip
                className={styles.chip}
                color="error"
                label="failed"
                deleteIcon={<DoneIcon/>}
            />
        </Box>
        <Button href={props.stage.body.failurePageURL}>Back to the merchant</Button>
    </Box>;
}

function PaymentPageContainer(props: { pid: string | string[] | undefined, stage: SocketMessage, body: JSX.Element }) {
    const [days, hours, minutes, seconds] = useCountdown(props.stage?.body.expireTime);

    let content
    if ((props.stage.messageType == 'waiting' || props.stage.messageType == 'partially_paid') && days + hours + minutes + seconds <= 0) {
        content = (
            <Box display='flex' flexDirection='column' alignItems='center'>
                <h3>Please don&apos;t send any money anymore because the payment will soon expire!</h3>
                <span>It will expire as soon as the next block gets mined.</span>
            </Box>
        )
    } else {
        content = props.body
    }

    return <React.Fragment>
        <Head>
            <title>Payment</title>
            <meta property="og:title" content="Payment" key="title" />
        </Head>
        <Grid className={styles.root} height={"100%"} container spacing={0} direction="column" alignItems="center"
              justifyContent="center">
            <Box className={styles.container} borderRadius={4} minWidth={"30vw"}>
                <Box className={styles.paymentid} alignItems="center" p={2} borderRadius={"4px 4px 0px 0px"}>
                    <Grid container alignItems={"center"}>
                        <Grid item>
                            <Typography>Payment ID</Typography>
                            <Typography>{props.pid}</Typography>
                        </Grid>
                        <Grid item marginLeft={"auto"}>
                            {props.stage?.body.expireTime && (props.stage.messageType == 'waiting' || props.stage.messageType == 'partially_paid') &&
                                <CountdownTimer targetDate={props.stage?.body.expireTime}/>}
                        </Grid>
                    </Grid>
                </Box>
                <Grid container className={styles.successCheckmark} p={2}>
                    <Grid item xs={12} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                        {content}
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </React.Fragment>;
}

const Payment: NextPage = () =>  {
    const router = useRouter()
    const { pid } = router.query
    const initialStage: SocketMessage = {messageType: "loading", body: {initialState: true, currency: "", mode:"", payAddress: "", payAmount: "", expireTime: "", successPageURL:"", failurePageURL: ""}}
    const [formValues, setFormValues] = useState({currency: ''})
    const [wsInstance, setWsInstance] = useState(null as unknown as WebSocket | null);
    const [stage, setStage] = useState(initialStage);

    const {data: configData} = useGetConfigQuery({})

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

    const handleSelectCurrency = (currency: string) => {
        setFormValues({
            ...formValues,
            'currency': currency,
        });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const currencySelection: SocketMessage = {
            messageType: 'currency-selection',
            // @ts-ignore
            body: formValues
        }
        wsInstance?.send(JSON.stringify(currencySelection))
    };

    let body = <Grid container alignItems={"center"} justifyContent={"center"} flexDirection={'column'}><CircularProgress /></Grid>

    if(stage) {
        let factor = configData?.supportedCryptoCurrencies?.find(c => c.shortName === stage.body.currency)?.conversionFactor
        let pay_amount_big = new BigNumber(stage.body.payAmount)
        let factor_big = new BigNumber(factor || 1)
        let payAmount = factor ? pay_amount_big.div(factor_big) : new BigNumber(0)

        switch (stage.messageType) {
            case "loading":
                body = <CircularProgress />
                break
            case "currency_selection":
                body = (
                    <CurrencySelection onSubmit={handleSubmit} formValues={formValues}
                                       onClickETH={() => handleSelectCurrency('eth')}
                                       onClickBTC={() => handleSelectCurrency('btc')}/>
            )
                break
            case "partially_paid":
            case "waiting":
                body = (
                    <Waiting payAmount={payAmount} stage={stage} />
                )
                break
            case "paid":
                body = (
                    <Paid stage={stage}/>
                )
                break
            case "confirmed":
            case "forwarded":
            case "finished":
                body = (
                    <Confirmed stage={stage}/>
                )
                break
            case "expired":
                body = (
                    <Expired stage={stage}/>
                )
                break
            case "failed":
                body = (
                    <Failed stage={stage}/>
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
            const ws = process.env.NODE_ENV == "development"
                ? new WebSocket(`ws://127.0.0.1:8000/ws?pid=${pid}`)
                : new WebSocket(`ws://127.0.0.1/backend/ws?pid=${pid}`)
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
        <PaymentPageContainer pid={pid} stage={stage} body={body}/>
    );
}

export default Payment;