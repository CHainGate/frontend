import * as React from 'react';
import type { NextPage } from 'next';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Dashboard: NextPage = () => {
    const rows = [
        {id: "1", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "2", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "3", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "4", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "5", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "6", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "7", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "8", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "paid", time: new Date()},
        {id: "9", priceAmount: 100, priceCurrency: "USD", payAmount: 0.5, payCurrency: "ETH", actuallyPaid: 0.6, transaction: "alsdjkiin", state: "waiting", time: new Date()}
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'priceAmount', headerName: 'Price Amount', width: 130 },
        { field: 'priceCurrency', headerName: 'Price Currency', width: 130 },
        { field: 'payAmount', headerName: 'Pay Amount', width: 130 },
        { field: 'payCurrency', headerName: 'Pay Currency', width: 130 },
        { field: 'actuallyPaid', headerName: 'Actually Paid', width: 130 },
        { field: 'transaction', headerName: 'Transaction', width: 160 },
        { field: 'state', headerName: 'State', width: 160 },
        { field: 'time', headerName: 'Time', type: "dateTime", width: 160 },
    ];

    return (
      <>
          <div style={{ marginLeft: 300, height: 500, width: '80%' }}>
          <DataGrid sx={{minWidth: 850}}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              ></DataGrid>
          </div>
      </>
    );
};

export default Dashboard;