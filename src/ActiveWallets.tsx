import { Button, Divider, Grid } from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteWalletMutation } from '../api/chaingate.api';
import { DeleteWalletApiArg, WalletResponseDto } from '../api/chaingate.generated';

export default function ActiveWallets({wallets}: {wallets: WalletResponseDto[] | undefined}) {
  const [deleteWallet] = useDeleteWalletMutation()
  const handleDelete = (id: string): void => {
    const arg: DeleteWalletApiArg = {
      id: id
    }
    deleteWallet(arg).unwrap()
  }
  return (
    <>
      <h2>Payout Addresses</h2>
      <div style={{width: 665}}>
        <Grid container rowSpacing={1} >
          <Grid item xs={2}>
            Currency
          </Grid>
          <Grid item xs={8}>
            Address
          </Grid>
          <Grid item xs={2} textAlign={"end"}>
            Action
          </Grid>
          <Grid item xs={12} sx={{marginBottom: 1}}>
            <Divider/>
          </Grid>
          {wallets?.map((wallet: WalletResponseDto) => (
            <Grid container key={wallet.id} alignItems={"center"} display={"flex"} sx={{marginBottom: 1}}>
              <Grid item xs={2} >
                {wallet.currency}
              </Grid>
              <Grid item xs={8} alignItems={"center"} display={"flex"}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 2}}>
                  {wallet.address}
                </div>
              </Grid>
              <Grid item xs={2} justifyContent={"end"} display={"flex"} alignItems={"center"}>
                <Button color="primary" variant="contained" onClick={() => handleDelete(wallet.id)}>
                  <DeleteIcon/>
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}