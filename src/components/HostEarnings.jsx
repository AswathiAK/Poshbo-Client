import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { hotelColumns } from './hotelsTableData';
import { useNavigate } from 'react-router-dom';


const HostEarnings = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/hotels/host/${user._id}`);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      setList(newList);
    }
  }, [data]);
  
  const showEarnings = (row) => {
    navigate(`/host/earnings/${row._id}`);
  };

  const bookingsColumn = [
    {
      field: 'bookings', headerName: 'Bookings', width: 150, renderCell: (params) => {
        return (
          <button onClick={() => showEarnings(params.row)}
            className="border border-dashed border-black py-2 px-3 rounded-md hover:bg-gray-300"
          >
            Earnings
          </button>
        );
      }
    }
  ];
  
  return (
    <div>
      {
        loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : list ? (
              <div style={{ height: '100%', width: '100%' }} >
                <DataGrid
                  rows={list}
                  columns={hotelColumns.concat(bookingsColumn)}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 1, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  checkboxSelection
                  getRowId={row => row._id}
                />
              </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                  No  data available.
                </div>
        )
      }
    </div>
  );
};

export default HostEarnings
