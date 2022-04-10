import * as React from 'react';
import type { NextPage } from 'next';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetLoggingInformationQuery } from '../api/chaingate.api';
import { LoggingInformationsResponseDto, PaymentHistory } from '../api/chaingate.generated';

interface LoggingRow {
    id: string;
    paymentId: string;
    priceAmount: number;
    priceCurrency: string;
    payAmount: number;
    payCurrency: string;
    actuallyPaid: number;
    transaction: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    webhook: string;
}

const Dashboard: NextPage = () => {
    const { data } = useGetLoggingInformationQuery({mode: "test"})
    let rows: LoggingRow[] = [];

    data?.forEach((payment: LoggingInformationsResponseDto) => {
        payment.history?.forEach((history: PaymentHistory) => {
            let row: LoggingRow = {
                id: history.id,
                paymentId: payment.payment_id,
                priceAmount: history.price_amount,
                priceCurrency: history.price_currency,
                payAmount: history.pay_amount,
                payCurrency: history.pay_currency,
                actuallyPaid: history.actually_paid || 0,
                transaction: "transaction here",
                state: history.payment_state,
                createdAt:  new Date(payment.created_at),
                updatedAt: new Date(payment.updated_at),
                webhook: payment.callback_url,
            }
            rows.push(row);
        })

    })

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150},
        { field: 'paymentId', headerName: 'Payment ID', width: 300 },
        { field: 'priceAmount', headerName: 'Price Amount', width: 130 },
        { field: 'priceCurrency', headerName: 'Price Currency', width: 130 },
        { field: 'payAmount', headerName: 'Pay Amount', width: 130 },
        { field: 'payCurrency', headerName: 'Pay Currency', width: 130 },
        { field: 'actuallyPaid', headerName: 'Actually Paid', width: 130 },
        { field: 'transaction', headerName: 'Transaction', width: 160 },
        { field: 'state', headerName: 'State', width: 160 },
        { field: 'webhook', headerName: 'Webhook', width: 160 },
        { field: 'createdAt', headerName: 'Created at', type: "dateTime", width: 160 },
        { field: 'updatedAt', headerName: 'Updated at', type: "dateTime", width: 160 },
    ];

    return (
      <>
          <div style={{ marginLeft: 300, height: 500, width: '80%' }}>
          <DataGrid sx={{minWidth: 850}}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              initialState={{
                  sorting: {
                      sortModel: [{ field: 'updatedAt', sort: 'desc' }],
                  },
                  columns: {
                      columnVisibilityModel: {
                          // Hide columns status and traderName, the other columns will remain visible
                          id: false,
                      },
                  },
              }}
          />
          </div>
      </>
    );
};

export default Dashboard;