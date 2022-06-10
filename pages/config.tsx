import * as React from 'react';
import type { NextPage } from 'next';
import AddWalletForm from '../src/AddWalletForm';
import ActiveWallets from '../src/ActiveWallets';
import { useGetConfigQuery, useGetWalletsQuery } from '../api/chaingate.api';
import { GetWalletsApiArg } from '../api/chaingate.generated';
import ApiKey from '../src/ApiKey';
import { useAppSelector } from '../lib/hooks';

const Configuration: NextPage = () => {
  const mode = useAppSelector((state) => state.internal.mode.mode);
  const { data: config, isError: isErrorConfig } = useGetConfigQuery({})
  const arg: GetWalletsApiArg = {
    mode
  }
  const { data: wallets, isError: isErrorWallet } = useGetWalletsQuery(arg)

  const options = config?.supportedCryptoCurrencies?.filter(currency => !wallets?.find(wallet => wallet.currency === currency.shortName)) || []
    return (
        <div style={{ marginLeft: 300, height: 'auto', width: '80%' }}>
          <h1>Configuration</h1>

          {options.length > 0 && <AddWalletForm options={options}/>}

          <ActiveWallets wallets={wallets}/>

          <ApiKey/>
        </div>
    )
};

export default Configuration;