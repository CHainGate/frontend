import * as React from 'react';
import type { NextPage } from 'next';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetLoggingInformationQuery } from '../api/chaingate.api';
import {LoggingInformationsResponseDto, PaymentHistory, useGetConfigQuery} from '../api/chaingate.generated';
import BigNumber from "bignumber.js";
import { useAppSelector } from '../lib/hooks';

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
    const mode = useAppSelector((state) => state.internal.mode.mode);
    const { data } = useGetLoggingInformationQuery({ mode })
    const {data: configData} = useGetConfigQuery({})
    let rows: LoggingRow[] = [];

    data?.forEach((payment: LoggingInformationsResponseDto) => {
        payment.history?.forEach((history: PaymentHistory) => {
            let factor = configData?.supportedCryptoCurrencies?.find(c => c.shortName === history.payCurrency)?.conversionFactor
            let pay_amount_big = new BigNumber(history.payAmount)
            let actually_paid_big = new BigNumber(history.actuallyPaid)
            let factor_big = new BigNumber(factor || 1)
            let payAmount = factor ? pay_amount_big.div(factor_big) : new BigNumber(0)
            let actuallyPaid = factor ? actually_paid_big.div(factor_big) : new BigNumber(0)
            let row: LoggingRow = {
                id: history.id,
                paymentId: payment.paymentId,
                priceAmount: history.priceAmount,
                priceCurrency: history.priceCurrency,
                payAmount: payAmount,
                payCurrency: history.payCurrency,
                actuallyPaid: actuallyPaid,
                transaction: "transaction here",
                state: history.paymentState,
                createdAt:  new Date(payment.createdAt),
                updatedAt: new Date(payment.updatedAt),
                webhook: payment.callbackUrl,
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