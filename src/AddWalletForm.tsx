import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useAddWalletMutation } from '../api/chaingate.api';
import { AddWalletApiArg, Currency } from '../api/chaingate.generated';

export default function AddWalletForm({options}: {options: Currency[]}) {
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [newPayoutWallet, setNewPayoutWallet] = useState('')

  const [addWallet, { isLoading, error }] = useAddWalletMutation()

  const handleSelectionChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
  };

  const handleWalletChange = (event: any) => {
    setNewPayoutWallet(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    try {
      let walletArg: AddWalletApiArg = {
        walletRequestDto: {
          currency: selectedCurrency as "eth" | "btc",
          address: newPayoutWallet,
          mode: "test",
        }
      }
      addWallet(walletArg).unwrap()
      setSelectedCurrency('')
      setNewPayoutWallet('')
    } catch {

    }
  }

  return (
    <>
      <h2>Payout Wallet</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel id="currency">Currency</InputLabel>
        <Select
          labelId="currency"
          id="currency"
          value={selectedCurrency}
          label="currency"
          onChange={handleSelectionChange}
        >
          {options?.map((option: Currency) => (
            <MenuItem key={option.shortName} value={option.shortName}>{option.shortName?.toUpperCase()}</MenuItem>
          ))}
        </Select>

        <TextField value={newPayoutWallet} id="payoutAddress" name="payoutAddress" label="Payout Address" type="text" fullWidth variant="standard" required onChange={handleWalletChange} />

        <Button type="submit" color="primary" variant="contained" fullWidth>
          Add new wallet
        </Button>
      </form>
    </>
  )
}