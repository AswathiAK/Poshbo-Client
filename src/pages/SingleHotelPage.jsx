import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { format } from 'date-fns';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import Person4Icon from '@mui/icons-material/Person4';
import { BookingWidget, ImageGallery, Loader, Map, MessageModal } from '../components';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';

const SingleHotelPage = () => {
  const { id } = useParams();
  const { user,dispatch } = useContext(AuthContext); 
  const { data, loading, error } = useFetch(`/hotels/${id}`); 
  const mapRef = useRef(null);
  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView();
    }
  };
  const navigate = useNavigate();
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const handleClickMessage = () => {
    if (user) {
      setOpenMessageModal(true);
    } else {
      toast.warn("Please login to send message", {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      navigate('/login');
   }
  };
  const totalRating = data?.reviews?.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);
  const averageRating = (totalRating / data?.reviews?.length).toFixed(2); 

  
  return (
    <div>
      <main className="min-h-screen px-4 md:px-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : data ? (
              <>
                <div className="h-24 pt-7">
                  <h1 className="text-2xl font-semibold">{data.name}</h1>
                  <div className="flex flex-col md:flex-row items-center py-1 justify-between">
                    <div className="flex gap-1 items-center cursor-pointer" onClick={scrollToMap}>
                      <span><PlaceIcon /></span>
                      <p className="font-medium underline">{data.address}</p>
                    </div>
                    {data?.reviews?.length > 0 && 
                      <div className="flex gap-1 items-center mt-2 md:mt-0">
                        <span><StarIcon sx={{ fontSize: '18px' }} /></span>
                        <p className="text-sm font-medium">{averageRating} &middot;</p>
                        <p className="text-sm font-medium underline">{data?.reviews?.length} reviews</p>
                      </div>
                    }
                  </div>
                </div>
                <div className="h-80">
                  <ImageGallery property={data} />
                </div>
                <div className="md:h-fit flex flex-col md:flex-row justify-between border-b">
                  <div className="pt-12 md:w-2/3">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                      <h2 className="text-xl font-medium md:mr-4">Room in a {data.type} hosted by {data.owner?.name}</h2>
                      <button onClick={handleClickMessage} className="py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black">
                        Message Host
                      </button>
                    </div>
                    {openMessageModal &&
                      <MessageModal receiver={data.owner?._id} open={openMessageModal} setOpen={setOpenMessageModal} />
                    }
                    <div className="pb-6 border-b">
                      {data.rooms?.map((room, index) => (
                        <div className="w-full border rounded-md p-5 mb-2" key={index}>
                          <h1 className="font-semibold text-lg py-1">{room.title} : Rs. {room.price}/-</h1>
                          <p className="font-light text-sm py-1">{room.description}</p>
                          <p className="text-md py-1">Max. No. of Guests : &nbsp;
                            {Array.from({ length: room.maxGuests }).map((_, i) => (
                              <Person4Icon key={i} sx={{ color: 'darkblue' }} />
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="py-12 border-b">
                      <div className="pb-4">
                        <h2 className="text-xl font-medium">About this place</h2>
                      </div>
                      <p className="font-light leading-6">{data.description}</p>
                    </div>
                    <div className="py-12">
                      <div className="pb-6">
                        <h2 className="text-xl font-medium">What this place offers</h2>
                      </div>
                      <div className="flex flex-wrap gap-5">
                        {data.perks?.map((perk, index) => (
                          <div key={index} className="rounded-lg border py-4 px-8 content-center mb-5">
                            {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 md:ml-20 w-full md:w-1/3">
                    <div className="border rounded-xl relative shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-5 py-6">
                      <BookingWidget hotel={data} />
                    </div>
                  </div>
                </div>
                <div className="py-12 border-b">
                  <div className="pb-6">
                    <h2 className="text-xl font-medium">Things to know</h2>
                  </div>
                  <div className=" flex flex-col md:flex-row justify-between">
                    <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
                      <div className="mb-3 ">
                      <h3 className='font-medium'>House rules</h3>
                    </div>
                      <div className="mb-4">
                        <span className='font-light'>Check in after : <strong>{data.checkInTime}</strong></span>
                      </div>
                      <div className="mb-4">
                        <span className='font-light'>Check out before : <strong>{data.checkOutTime}</strong></span>
                      </div>
                    </div>
                    <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
                      <div className="mb-3 ">
                        <h3 className='font-medium'>Extra info</h3>
                      </div>
                      <div className="mb-4">
                        <span className='font-light'>
                          Carbon monoxide alarm not reported
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className='font-light'>
                          {data.extraInfo}
                        </span>
                      </div>
                    </div>
                    <div className="px-2 w-full md:w-1/4 mb-8 md:mb-0">
                      <div className="mb-3 ">
                        <h3 className='font-medium'>Cancellation policy</h3>
                      </div>
                      <div className="mb-4">
                        <span className='font-light'>
                          Cancel before check-in on check in date  for a partial refund.
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className='font-light'>
                          Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions
                          caused by COVID-19.
                        </span>
                      </div>
                    </div>
                  </div>
                 </div>
                <div className="py-12 border-b" ref={mapRef}>
                  <div className="pb-6">
                    <h2 className="text-xl font-medium">Where you'll be</h2>
                  </div>
                  <div className="mb-6">
                    <span className="font-light">{data.address}</span>
                  </div>
                  <div>
                    <Map address={data.address} city={data.city} />
                  </div>
                </div>
                <div className="py-12 w-full">
                  {data?.reviews?.length > 0 ? (
                    <>
                      <div className="mb-8 flex gap-2 items-center">
                        <span><StarIcon /></span>
                        <h2 className="text-xl font-medium">{averageRating} &middot;</h2>
                        {data?.reviews?.length === 1 ? 
                          <h2 className="text-xl font-medium">
                            {data?.reviews?.length} review
                          </h2>
                          :
                          <h2 className="text-xl font-medium">
                            {data?.reviews?.length} reviews
                          </h2>
                        }                        
                      </div>
                        <div className="flex flex-wrap gap-y-4" >
                        {data?.reviews?.map((review, index) => (
                          <div className="w-full md:w-1/3" key={index}>
                            <div className="mb-3">
                              <p className="text-lg">{review.user?.name}</p>
                              <span className="text-sm">{format(new Date(review.createdAt), 'MMMM yyyy')}</span>
                            </div>
                            <div className="text-base">
                              <p className='pb-1'>{review.reviewTitle}</p>
                              <p>{review.comment}</p>
                            </div>
                          </div>  
                        ))}                      
                      </div>
                    </>
                  ) :
                    <div>
                      No reviews available
                    </div>
                  }
                </div>
              </>
        ) : (
          <div className="flex items-center justify-center h-full">
            No data available
          </div>
        )}
      </main>
    </div>
  );
};

export default SingleHotelPage;
