import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PropertyHeader from './PropertyHeader';
import Footer from './Footer';
import Loader from './Loader';
import { DataGrid } from '@mui/x-data-grid';
import { earningsColumns } from './hotelsTableData';

const EarningsofHotel = () => {
  const location = useLocation();
  const hotelId = location.pathname.split('/')[3];
  const { data, loading, error } = useFetch(`/hotels/find/host/earnings/${hotelId}`); 
  const [list, setList] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      setList(newList);
      const total = data.reduce((total, item) => {
        return total + item.earnings;
      }, 0);
      setTotalEarnings(total);
    }
  }, [data]);

  return (
    <div>
      <PropertyHeader />
      <main className="min-h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full mt-5">
            {error}
          </div>
        ) : list.length > 0 && list ? (
              <div className='pt-7' style={{ height: '100%', width: '100%' }}>
                <DataGrid
                  rows={list}
                  columns={earningsColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 1, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  checkboxSelection
                  getRowId={row => row._id}
                  rowHeight={100}
                />
                <p className='text-center mt-10 text-2xl'>Total Earnings :
                  <span className="text-green-700 font-semibold font-serif">Rs. {totalEarnings.toFixed(2)} /-</span>
                </p>
              </div>
        ) : (
          <div className="flex items-center justify-center h-full pt-7">
            No Bookings available
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default EarningsofHotel
