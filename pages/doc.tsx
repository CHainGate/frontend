import { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from '../src/Footer';
import Box from "@mui/material/Box";
import logo from '../public/CHainGate_white_transparent.svg';
import Image from 'next/image';
import Link from '@mui/material/Link';

const Doc: NextPage = () => {
  const exampleUrl = "https://github.com/CHainGate/example-app/blob/main/nodejs-server/app.js#L20";
  const swaggerDocUrl = process.env.NODE_ENV == "development"
    ? "http://localhost:8000/api/public/swaggerui/"
    : "http://localhost/backend/api/public/swaggerui";

  return (
    <>
      <Box bgcolor="primary.main">
        <Container>
          <Box>
            <Image height={80} width={100} src={logo} alt="Logo exRap" className="logo" />
          </Box>
        </Container>
      </Box>
    <Container>
      <Head>
        <title>Documentation</title>
        <meta property="og:title" content="Documentation" key="title" />
      </Head>

      <h1>Documentation</h1>
      CHainGate is a cryptocurrency payment provider. With our service we help merchants to integrate cryptocurrency payments.
      Currently we provide ethereum and bitcoin payments, but plan to expand our offer.

      <p style={{fontWeight: "bold"}}><Link href={swaggerDocUrl}>Here do you find our OpenAPI Specification</Link></p>

      <h2>Authentication</h2>
      To use the CHainGate API you should do the following:
      <ul>
        <li><Link href={"/register"} >Sign up</Link> at CHainGate</li>
        <li>Create an API key</li>
        <li>Add your outcome address</li>
      </ul>

      <h2>Testing</h2>
      With our service you can test the integration process without spending any real money.
      Every blockchain has a mainnet for production and a testnet for testing.
      On our dashboard you have a switch to change from mainnet to testnet.

      <p style={{fontWeight: "bold"}}>To create a testnet payment, you need to use your testnet API key.</p>

      <h3>Create a test wallet</h3>
      <ol>
        <li>Create a wallet on the testnet.</li>
          <ul>
            <li>For ethereum you can use metamask.</li>
            <li>For bitcoin you can use electrum.</li>
          </ul>
        <li>Use a faucet to receive coins on your testnet.</li>
      </ol>

      <h3>Dashboard settings</h3>
      <ol>
        <li>Disable mainnet on the dashboard to activate testnet.</li>
        <li>Create a new API key. This API key is used for all test requests.</li>
        <li>Add your testnet outcome address</li>
        <li>Create your API calls with your testnet API key</li>
      </ol>

      <h3>Dashboard</h3>
      You can always switch from mainnet to testnet on the dashboard and see the data from the specific environment.

      <h2>Standard flow Invoice</h2>
      <ol>
        <li>Customer selects a product, which he wants to buy.</li>
        <li>Create a new invoice. For details se OpenAPI specification.</li>
        <li>Forward the customer to the invoiceUrl from the API response.</li>
        <li>Customer selects his preferred currency and pays.</li>
        <li>After the payment the customer gets forwarded to the successPageUrl.</li>
        <li>Wait for the finished notification via webhook, to be sure that you received the money.</li>
      </ol>

      <h2>Standard flow Payment</h2>
      <ol>
        <li>Customer selects a product, which he wants to buy.</li>
        <li>You need ask the customer with which currency he wants to pay.</li>
        <li>Create a new payment. For details se OpenAPI specification.</li>
        <li>Show the customer the payAddress and the payAmount.</li>
        <li>After the customer paid, you will get notifications over webhook.</li>
        <li>Notify the customer what state his payment has.</li>
        <li>Wait for the finished notification via webhook, to be sure that you received the money.</li>
      </ol>

      <h2>Notifications</h2>
      Notifications are sent via webhook to the defined callbackUrl when crating a new invoice or payment.
      You get a notification for every state change from the payment.
      Here is a list with all states available:

      <ul>
        <li>waiting: Payment is created and we are waiting to receive the payment from the buyer.</li>
        <li>partially_paid: Buyer has not paid the full amount.</li>
        <li>paid: Buyer has paid. The transaction has 0 confirmations on the blockchain.</li>
        <li>confirmed: The transaction on the blockchain is confirmed. For bitcoin 6 blocks and for ethereum 12.</li>
        <li>forwarded: CHainGate has sent the money to the merchant and the transaction has 1 confirmation.</li>
        <li>finished: The forwarding transaction has for bitcoin 6 and ethereum 12 confirmations.</li>
        <li>expired: After 15min. the payment expires, if the buyer has not paid enough.</li>
        <li>failed: If there is a problem, which can not recover automatically.</li>
      </ul>

      <h3>Security mechanism</h3>
      To verify that the webhook is really from CHainGate, we have build a security mechanism.
      When receiving a webhook, you need to sort the data by key and use hmac with your API key to create a hash.
      In the webhook, there is a signature. If your generated hash is the same as the signature from the webhook, you can be sure that it is a valid request.

      <p><Link href={exampleUrl}>Here</Link> do you find an example implementation in nodejs.</p>
      </Container>
      <Footer/>
    </>
  )
}

export default Doc;