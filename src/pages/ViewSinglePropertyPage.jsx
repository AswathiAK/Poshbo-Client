import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, yellow } from '@mui/material/colors';
import Swal from 'sweetalert2'
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Footer, ImageSlider, Loader, PropertyHeader, RoomFormModal } from '../components';
import AddRoomPage from './AddRoomPage';
import EditRoomPage from './EditRoomPage';

const ViewSinglePropertyPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);
  const { id } = useParams();
  const [property, setProperty] = useState();
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/hotels/host/${user._id}/${id}`); 
  useEffect(() => {
    setProperty(data);
  }, [data]);
  const handleEdit = (roomId) => {
    setEditRoomId(roomId);
    setOpenEditModal(true);
  }
  const handleDelete = async (hotelId, roomId) => { 
    try {
      const result = await Swal.fire({
        title: 'Are you sure ?',
        icon: 'warning',
        iconColor: '#a35',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        width: 450,    
        color:'#020274'
      });
      if (result.isConfirmed) {
        const { data } = await axios.delete(`/rooms/${hotelId}/${roomId}`); 
        const updatedProperty = {
          ...property,
          rooms: property.rooms.filter(item => item._id !== roomId),
        }
        setProperty(updatedProperty); 
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  };

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
          ) : property ? (
              <div className="flex flex-grow overflow-auto gap-3 my-8">
                <div className="w-1/2 border rounded-md flex flex-col overflow-auto p-5">
                  <div className="py-2 flex items-center ">                    
                    <div className="w-1/3 flex items-center pr-2">                      
                      <h1 className="text-lg font-bold">Hotel Name</h1>                      
                    </div>                    
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.name}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Type of Stay</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.type}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Title</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.title}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Location</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.city}</p>
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Address</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.address}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Check-in Time</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.checkInTime}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Check-out Time</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      <p className="text-lg">{property.checkOutTime}</p>
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Facilities</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      {property.perks?.length> 0 && property.perks.map((perk, index) => (
                        <p className="text-lg" key={index}>{perk}</p>
                      ))}
                    </div>
                  </div>
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Verification Status</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">
                      {property.isVerified ?
                        <VerifiedIcon sx={{ color: green[500], margin: '15px' }} /> :
                        <PendingActionsIcon sx={{ color: yellow[800], margin: '15px' }}/>                        
                      } 
                    </div>
                  </div> 
                  <div className="py-2 flex items-center  ">
                    <div className="w-1/3 flex items-center pr-2">
                      <h1 className="text-lg font-bold">Rooms</h1>
                    </div>
                    <span className="text-lg mx-2">:</span>
                    <div className="w-2/3">                      
                      <button onClick={()=>setOpenAddModal(true)}
                        className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border
                       border-blue-500 rounded ml-4'
                      >
                        Add Rooms
                      </button>  
                      {openAddModal &&
                        <RoomFormModal title="Add Room" open={openAddModal} setOpen={setOpenAddModal} >
                          <AddRoomPage propertyId={property._id} />
                        </RoomFormModal>
                      }
                      {/* <RoomFormModal title="Add Room" >
                        <RoomFormPage propertyId={property._id} />
                      </RoomFormModal>                       */}
                    </div>
                  </div> 
                  <div className="py-2">
                    {property.rooms?.length> 0 && property.rooms.map((room, index) => (
                      <div className="w-full border rounded-md p-2" key={index}>
                        <div className="p-2 my-2 border relative" >
                          <h1 className="font-semibold text-lg py-1">{room.title} : Rs. {room.price}/-</h1> 
                          <p className="font-light text-sm py-1">{room.description}</p>
                          <p className="text-md py-1">Max. No. of Guests : {room.maxGuests}</p>
                          <p className="text-md py-1">No. of {room.title} : {room.roomNumbers.length}</p>

                          <button onClick={()=>handleEdit(room._id)}
                            className='text-blue-900 border rounded-md px-2 py-1 hover:bg-slate-200 absolute top-3 right-16'
                          >
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDelete(property._id,room._id)}
                            className='text-red-600 border px-2 py-1 rounded-md hover:bg-slate-200 absolute top-3 right-3'
                          >                      
                            <DeleteIcon />
                          </button>
                          {openEditModal &&
                            <RoomFormModal title="Edit Room" open={openEditModal} setOpen={setOpenEditModal} >
                              <EditRoomPage roomId={editRoomId} propertyId={property._id} />
                            </RoomFormModal>
                          }
                        </div>                        
                      </div>                    
                    ))}
                  </div>
                </div>                
                <div className="w-1/2 border rounded-md flex flex-col ">
                {/* Top right */}
                  <div className="h-1/2 p-5 border-b ">                    
                    <h1 className="text-lg font-bold mb-4 p-2">Photos</h1>   
                    <div className="py-2 my-0 mx-auto w-[500px] h-[280px]">
                      <ImageSlider property={property} />
                    </div>
                  </div>                 
                {/* Bottom right */}
                  <div className="h-auto p-5">
                    <h1 className="text-lg font-bold p-2">Document Proof</h1>
                    <div className="flex my-5 justify-center" >
                      <img
                        src={property.documentProof}
                        alt="photo"
                        className='border rounded-md w-1/2 object-cover'
                      />                      
                    </div> 
                  </div>
                </div>
              </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                  No data available
                </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ViewSinglePropertyPage
