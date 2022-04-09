import { Button, Divider, MenuItem, Switch } from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteWalletMutation } from '../api/chaingate.api';
import { DeleteWalletApiArg, WalletResponseDto } from '../api/chaingate.generated';

export default function ActiveWallets({wallets}: {wallets: WalletResponseDto[] | undefined}) {
  const [
    deleteWallet, // This is the mutation trigger
    { isLoading, error } // This is the destructured mutation result
  ] = useDeleteWalletMutation()
  const handleDelete = (id: string): void => {
    const arg: DeleteWalletApiArg = {
      walletId: id
    }
    deleteWallet(arg).unwrap()
  }
  return (
    <>
      <><span>currency</span><span>Address</span><span>action</span></>
      {wallets?.map((wallet: WalletResponseDto) => (
        <div key={wallet.id}>
          <Divider></Divider>
          <><span>{wallet.currency}</span><span>{wallet.address}</span>
            <Button color="primary" variant="contained" onClick={() => handleDelete(wallet.id)}>
              <DeleteIcon/>
            </Button></>
        </div>
      ))}
    </>
  )
}