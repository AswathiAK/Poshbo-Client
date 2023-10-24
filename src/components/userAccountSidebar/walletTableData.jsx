import { format } from 'date-fns';

export const walletColumns = [
  { field: 'serialNumber', headerName: 'SL.No', width: 50 },
  { field: 'transactionId', headerName: 'Transaction Id', width: 150 },
  { field: 'bookingId', headerName: 'Booking Id', width: 150 },
  { field: 'creditedAmount', headerName: 'Credited Amount', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Credited On',
    width: 100,
    renderCell:(params)=> format(new Date(params.row.createdAt), 'dd/MM/yyyy')
  },
];