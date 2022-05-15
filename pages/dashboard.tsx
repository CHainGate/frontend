import * as React from 'react';
import type { NextPage } from 'next';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetLoggingInformationQuery } from '../api/chaingate.api';
import {LoggingInformationsResponseDto, PaymentHistory, useGetConfigQuery} from '../api/chaingate.generated';
import BigNumber from "bignumber.js";

interface LoggingRow {
    id: string;
    paymentId: string;
    priceAmount: number;
    priceCurrency: string;
    payAmount: BigNumber;
    payCurrency: string;
    actuallyPaid: BigNumber;
    transaction: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    webhook: string;
}

const Dashboard: NextPage = () => {
    const { data } = useGetLoggingInformationQuery({mode: "test"})
    const {data: configData} = useGetConfigQuery({})
    let rows: LoggingRow[] = [];

    data?.forEach((payment: LoggingInformationsResponseDto) => {
        payment.history?.forEach((history: PaymentHistory) => {
            console.log(history.pay_amount)
            let factor = configData?.supportedCryptoCurrencies?.find(c => c.shortName === history.pay_currency)?.conversion_factor
            console.log(factor)
            let pay_amount_big = new BigNumber(history.pay_amount)
            let actually_paid_big = new BigNumber(history.actually_paid)
            let factor_big = new BigNumber(factor || 1)
            let payAmount = factor ? pay_amount_big.div(factor_big) : new BigNumber(0)
            let actuallyPaid = factor ? actually_paid_big.div(factor_big) : new BigNumber(0)
            let row: LoggingRow = {
                id: history.id,
                paymentId: payment.payment_id,
                priceAmount: history.price_amount,
                priceCurrency: history.price_currency,
                payAmount: payAmount,
                payCurrency: history.pay_currency,
                actuallyPaid: actuallyPaid,
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