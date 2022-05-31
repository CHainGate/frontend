import * as React from 'react';
import type { NextPage } from 'next';
import {DataGrid, GridColDef, GridEventListener, GridRenderCellParams} from '@mui/x-data-grid';
import { useGetLoggingInformationQuery } from '../api/chaingate.api';
import {LoggingInformationsResponseDto, PaymentHistory, useGetConfigQuery} from '../api/chaingate.generated';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import BigNumber from "bignumber.js";
import {useState} from "react";

interface LoggingRow {
    id: string;
    paymentId: string;
    mode: string;
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

function getBlockExplorerURL(params: GridRenderCellParams) {
    let hash = params.value
    let mode = params.row.mode
    if(params.row.payCurrency == 'eth') {
        if (mode == 'test') {
            return `https://rinkeby.etherscan.io/tx/` + hash
        } else {
            return `https://etherscan.io/tx/` + hash
        }
    } else {
        if (mode == 'test') {
            return `https://www.blockchain.com/btc-testnet/tx/` + hash
        } else {
            return `https://www.blockchain.com/btc/tx/` + hash
        }
    }

}

type MainRowType = LoggingRow & {payment: LoggingInformationsResponseDto}

const Dashboard: NextPage = () => {
    let initialPayment: LoggingInformationsResponseDto = {
        callbackUrl: "",
        createdAt: "",
        mode: "main",
        history: [],
        paymentId: "",
        updatedAt: ""
    }
    const [payment, setPayment] = useState(initialPayment);
    const { data, isLoading } = useGetLoggingInformationQuery({mode: "test"})
    const {data: configData} = useGetConfigQuery({})
    let rows: LoggingRow[] = [];

    const onEvent: GridEventListener<'cellClick'> = (
        params, // GridRowParams
        event,  // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        if (params.field == "actions") {
            if (payment.paymentId) {
                setPayment(initialPayment)
            } else {
                setPayment(params.row.payment)
            }
        }
    }

    let columns: GridColDef[]
    if (payment.paymentId) {
        payment.history?.forEach((history: PaymentHistory) => {
            let factor = configData?.supportedCryptoCurrencies?.find(c => c.shortName === history.payCurrency)?.conversionFactor
            let pay_amount_big = new BigNumber(history.payAmount)
            let actually_paid_big = new BigNumber(history.actuallyPaid)
            let factor_big = new BigNumber(factor || 1)
            let payAmount = factor ? pay_amount_big.div(factor_big) : new BigNumber(0)
            let actuallyPaid = factor ? actually_paid_big.div(factor_big) : new BigNumber(0)
            let row: MainRowType = {
                id: history.id,
                paymentId: payment.paymentId,
                mode: payment.mode,
                priceAmount: history.priceAmount,
                priceCurrency: history.priceCurrency,
                payAmount: payAmount,
                payCurrency: history.payCurrency,
                actuallyPaid: actuallyPaid,
                transaction: payment.transaction || "",
                state: history.paymentState,
                createdAt: new Date(history.createdAt),
                updatedAt: new Date(history.createdAt),
                webhook: payment.callbackUrl,
                payment: payment
            }
            rows.push(row);
        })

        columns = [
            {
                field: "actions",
                headerName: "",
                sortable: false,
                width: 10,
                renderCell: () => {
                    if (!payment.paymentId){
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <MoveDownIcon />
                            </div>
                        )
                    }

                    return (
                        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                            <MoveUpIcon />
                        </div>
                    );
                }
            },
            { field: 'id', headerName: 'ID', width: 150},
            { field: 'paymentId', headerName: 'Payment ID', width: 300 },
            { field: 'createdAt', headerName: 'Created at', type: "dateTime", width: 160 },
            { field: 'payAmount', headerName: 'Pay Amount', width: 150 },
            { field: 'actuallyPaid', headerName: 'Paid', width: 100 },
            { field: 'state', headerName: 'State', width: 150 },
        ];
    } else {
        data?.forEach((payment: LoggingInformationsResponseDto) => {
            let history = payment.history[0]
            let factor = configData?.supportedCryptoCurrencies?.find(c => c.shortName === history.payCurrency)?.conversionFactor
            let pay_amount_big = new BigNumber(history.payAmount)
            let actually_paid_big = new BigNumber(history.actuallyPaid)
            let factor_big = new BigNumber(factor || 1)
            let payAmount = factor ? pay_amount_big.div(factor_big) : new BigNumber(0)
            let actuallyPaid = factor ? actually_paid_big.div(factor_big) : new BigNumber(0)
            let row: MainRowType = {
                id: history.id,
                paymentId: payment.paymentId,
                mode: payment.mode,
                priceAmount: history.priceAmount,
                priceCurrency: history.priceCurrency,
                payAmount: payAmount,
                payCurrency: history.payCurrency,
                actuallyPaid: actuallyPaid,
                transaction: payment.transaction || "",
                state: history.paymentState,
                createdAt:  new Date(payment.createdAt),
                updatedAt: new Date(payment.updatedAt),
                webhook: payment.callbackUrl,
                payment: payment
            }
            rows.push(row);
        })
        columns = [
            {
                field: "actions",
                headerName: "",
                sortable: false,
                width: 10,
                renderCell: () => {
                    if (!payment.paymentId){
                        return (
                            <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                <MoveDownIcon />
                            </div>
                        )
                    }

                    return (
                        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                            <MoveUpIcon />
                        </div>
                    );
                }
            },
            { field: 'id', headerName: 'ID', width: 150},
            { field: 'paymentId', headerName: 'Payment ID', width: 300 },
            { field: 'mode', headerName: 'Mode', width: 80 },
            { field: 'updatedAt', headerName: 'Updated at', type: "dateTime", width: 160 },
            { field: 'priceAmount', headerName: 'Amount', width: 100, align: "right" },
            { field: 'priceCurrency', headerName: 'Fiat', width: 90 },
            { field: 'payAmount', headerName: 'Pay Amount', width: 130},
            { field: 'payCurrency', headerName: 'Currency', width: 100 },
            { field: 'actuallyPaid', headerName: 'Paid', width: 100 },
            { field: 'transaction', headerName: 'Transaction', width: 160, renderCell: (params) => (
                <a href={getBlockExplorerURL(params)} style={{ overflow: "hidden", textOverflow: "ellipsis"}}>{params.value}</a>
            ) },
            { field: 'state', headerName: 'State', width: 100 },
            { field: 'webhook', headerName: 'Webhook', width: 160 },
            { field: 'createdAt', headerName: 'Created at', type: "dateTime", width: 160 },
        ];
    }

    let celltsToHide = {
        id: false,
    }

    return (
      <>
          <div style={{ marginLeft: 300, height: 800, width: '80%' }}>
          <DataGrid sx={{minWidth: 850}}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              onCellClick={onEvent}
              getRowClassName={(params) => `data-grid--${params.row.state}`}
              initialState={{
                  sorting: {
                      sortModel: [{ field: 'updatedAt', sort: 'desc' }],
                  },
                  columns: {
                      columnVisibilityModel: celltsToHide,
                  },
              }}
          />
          </div>
      </>
    );
};

export default Dashboard;