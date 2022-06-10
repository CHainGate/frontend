import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useAddWalletMutation } from '../api/chaingate.api';
import { AddWalletApiArg, Currency } from '../api/chaingate.generated';
import { useAppSelector } from '../lib/hooks';
import FormControl from '@mui/material/FormControl';


export default function AddWalletForm({options}: {options: Currency[]}) {
  const mode = useAppSelector((state) => state.internal.mode.mode);
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
          mode,
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
      <h2>Add Payout Address</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel sx={{}} id="currency">Currency</InputLabel>
          <Select sx={{ width: 150}}
                  labelId="currency"
                  id="currency"
                  value={selectedCurrency}
                  label="currency"
                  required
                  onChange={handleSelectionChange}
          >
            {options?.map((option: Currency) => (
              <MenuItem key={option.shortName} value={option.shortName}>{option.shortName?.toUpperCase()}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{marginLeft: 2, width: 500}}
          value={newPayoutWallet}
          id="payoutAddress"
          name="payoutAddress"
          label="Payout Address"
          type="text"
          variant="outlined"
          required
          onChange={handleWalletChange}
        />

        <div>
          <Button
            sx={{marginTop: 2, width: 665}}
            type="submit"
            color="primary"
            variant="contained">
            Add new wallet
          </Button>
        </div>
      </form>
    </>
  )
}