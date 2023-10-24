import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import { walletColumns } from './userAccountSidebar/walletTableData';

const UserWallet = () => {
  const { user } = useContext(AuthContext); 
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  const { data: walletHistory } = useFetch(`/bookings/${user._id}/wallet`);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (walletHistory) {
      const newList = walletHistory.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      setList(newList);
    }
  }, [walletHistory]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data || list ? (
            <div>
              <div className='my-10 text-center font-semibold text-lg'>
                Wallet Balance = Rs. {data?.wallet}/-
              </div>
              <div style={{ height: '100%', width:'100%'}} >
                <DataGrid
                  rows={list}
                  columns={walletColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 1, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  checkboxSelection
                  getRowId={row=>row._id}
                />
              </div>  
            </div>
          ) : (
              <div className="flex items-center justify-center h-full">
                No data available
              </div>
      )} 
    </div>
  )
}

export default UserWallet
