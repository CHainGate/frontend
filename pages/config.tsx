import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import SwitchMode from '../src/SwitchMode';
import AddWalletForm from '../src/AddWalletForm';
import ActiveWallets from '../src/ActiveWallets';
import { useGetConfigQuery, useGetWalletsQuery } from '../api/chaingate.api';
import { GetWalletsApiArg } from '../api/chaingate.generated';
import AddApiKeyForm from '../src/AddApiKeyForm';
import ActiveApiKeys from '../src/ActiveApiKeys';

const Configuration: NextPage = () => {
  const { data: config, isError: isErrorConfig } = useGetConfigQuery({})
  const arg: GetWalletsApiArg = {
    mode: "test"
  }
  const { data: wallets, isError: isErrorWallet } = useGetWalletsQuery(arg)

  const options = config?.supportedCryptoCurrencies?.filter(currency => !wallets?.find(wallet => wallet.currency === currency.shortName)) || []
    return (
        <Container maxWidth="sm">
          <SwitchMode/>
          <h1>Configuration</h1>

          {options.length > 0 && <AddWalletForm options={options}/>}

          <ActiveWallets wallets={wallets}/>

          <h2>Secret API Key</h2>
          <AddApiKeyForm keyType="secret" buttonText="create secret api key"/>
          <ActiveApiKeys keyType="secret"/>

          <h2>Public API Key</h2>
          <AddApiKeyForm keyType="public" buttonText="create public api key"/>
          <ActiveApiKeys keyType="public"/>
        </Container>
    )
};

export default Configuration;