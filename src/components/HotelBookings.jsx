import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PropertyHeader from './PropertyHeader';
import Footer from './Footer';
import Loader from './Loader';
import { DataGrid } from '@mui/x-data-grid';
import { bookingsColumns } from './hotelsTableData';
import axios from "../services/axios";
import { toast, Flip } from 'react-toastify';
import { format } from 'date-fns';

const HotelBookings = () => {
  const { bookingType, hotelId } = useParams();
  const { data, loading, error } = useFetch(
    bookingType === 'bookings'
      ? `/hotels/find/host/bookings/${hotelId}`
      : `/hotels/find/host/todaysBookings/${hotelId}`
  );
  const [list, setList] = useState([]);
  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      setList(newList);
    }
  }, [data]);

  const isCheckInDate = (checkInDate) => {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    const checkInDateTime = format(new Date(checkInDate), 'dd/MM/yyyy'); 
    return currentDate >= checkInDateTime;
  }; 
  const updateBookingStatus = async (id, status) => {
    try {
      const { data: updatedData } = await axios.patch(`/hotels/bookings/${id}`, { status });
      setList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, bookingStatus: updatedData.bookingStatus } : item
        )
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000,
      });
    }
  };

  const getSelectedRoomDetails = (selectedRooms, roomDetails) => {
    const selectedRoomDetails = [];
    selectedRooms.forEach((selectedRoomId) => {
      roomDetails.forEach((roomDetail) => {
        const matchingRoomNumber = roomDetail.roomNumbers.find(
          (roomNumber) => roomNumber._id === selectedRoomId
        );
        if (matchingRoomNumber) {
          selectedRoomDetails.push({
            title: roomDetail.title,
            roomNumber: matchingRoomNumber.number,
          });
        }
      });
    });
    return selectedRoomDetails;
  };

  const actionColumns = [
    {
      field: 'roomDetails', headerName: 'Selected Rooms', width: 180, renderCell: (params) => {
        const selectedRoomDetails = getSelectedRoomDetails(params.row.selectedRooms, params.row.roomDetails);
        return (
          <div>
            {selectedRoomDetails.map((room, index) => (
              <div key={index}>
                <p>{room.title} : {room.roomNumber} </p>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      field: 'bookingStatus',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const handleChange = (event) => {
          const newBookingStatus = event.target.value;
          updateBookingStatus(params.row._id, newBookingStatus);
        };
        const isCheckInEnabled = isCheckInDate(params.row.checkInDate); 
        return (
          params.row.bookingStatus !== 'cancelled' ? (
            <select value={params.row.bookingStatus} onChange={handleChange} disabled={params.row.bookingStatus !== 'booked'}>
              <option value="booked">Booked</option>
              <option value="checkedIn" disabled={!isCheckInEnabled}>Checked In</option>
              <option value="notCheckedIn" disabled={!isCheckInEnabled}>Not Checked In</option>
            </select>
          ) : (
            'Cancelled'
          )
        );
      }
    }
  ];

  return (
    <div>
      <PropertyHeader />
      <main className="min-h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : list.length > 0 && list ? (
          <div className='pt-7' style={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={list}
              columns={bookingsColumns.concat(actionColumns)}
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
          </div>
        ) : (
          <div className="flex items-center justify-center h-full pt-7">
            No Bookings available
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HotelBookings
