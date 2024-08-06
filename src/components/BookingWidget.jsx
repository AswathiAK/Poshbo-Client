// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast, Flip } from "react-toastify";
// import { differenceInCalendarDays, format } from "date-fns";
// import { addDays } from 'date-fns';
// import DateComponent from './DateComponent';
// import AddGuestsComponent from './AddGuestsComponent';
// import { SearchContext } from '../context/SearchContext';
// import { AuthContext } from '../context/AuthContext';
// import ChooseRoomModal from './ChooseRoomModal';
// import axios from "../services/axios";
// import useFetch from '../hooks/useFetch';
// import { loadStripe } from '@stripe/stripe-js';

// const BookingWidget = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const { selectedDates, selectedOptions, searchDispatch } = useContext(SearchContext);
//   const { data:hotel } = useFetch(`/hotels/${id}`);
//   const navigate = useNavigate();
//   const [openDate, setOpenDate] = useState(false);
//   const [dates, setDates] = useState(selectedDates || [
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 1),
//       key: 'selection'
//     }
//   ]);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState(selectedOptions || {
//     room: 1,
//     guests: 1
//   });
//   const [rooms, setRooms] = useState([{ room: options.room, guests: options.guests }]);
//   useEffect(() => {
//     setDates(selectedDates || [
//       {
//         startDate: new Date(),
//         endDate: addDays(new Date(), 1),
//         key: 'selection'
//       }
//     ]);
//     setOptions(selectedOptions || {
//       room: 1,
//       guests: 1
//     });
//   }, [selectedDates, selectedOptions]);

//   useEffect(() => {
//     searchDispatch({ type: "NEW_SEARCH", payload: { dates, options } });
//   }, [dates, options, searchDispatch]);
 
//   const [openChooseRoom, setOpenChooseRoom] = useState(false);
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
  
//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const date = new Date(start.getTime());
//     const dates = [];
//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }
//     return dates;
//   };
//   const getNumberOfNights = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const noOfNights = differenceInCalendarDays(end, start);
//     return noOfNights;
//   }
//   const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
//   const totalNights = getNumberOfNights(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unAvailableDates.some(date =>
//       allDates.includes(new Date(date).getTime())
//     );
//     return !isFound;
//   };

//   const totalPriceWithNights = totalPrice * totalNights;
//   const taxAmount = totalPriceWithNights * 18 / 100;
//   const totalPriceIncludeTax = (totalPriceWithNights + taxAmount).toFixed(2);

//   const handleBooking = async() => {
//     if (user) {
//       try {
//         const stripe = await loadStripe('pk_test_51NpFlsSBKhqPZUqdQwvAlZNY3ulJj3Aph8XN9CfZRHbGyCzMOAWkHOhrMnrltGOEhCc7xbShQHXq0FgbBQgxKYR100H8uVUmof');
//         const bookingData = {
//           hotel: hotel._id,
//           checkInDate: dates[0].startDate,
//           checkOutDate: dates[0].endDate,
//           noOfGuests: options.guests,
//           selectedRooms,
//           totalAmount: totalPriceIncludeTax,
//           dates:allDates
//         };
//         const stripeData = {
//           user,
//           hotelId:hotel._id,
//           price: totalPriceIncludeTax,
//           bookingData
//         };
//         const response = await axios.post(`/bookings/${user._id}/create-checkout-session`,stripeData);
//         const session = response.data.id;
//         const result = stripe.redirectToCheckout({
//           sessionId: session
//         });
//       } catch (error) {
//         const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//         toast.error(errorMessage, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000
//         });
//       }
//     } else {
//       toast.warn("Please login to book", {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Flip,
//         autoClose: 2000
//       });
//       navigate('/login');
//     }
//   };
  
//   return (
//     <div>
//       <div className="border flex items-center justify-between p-3.5">
//         <div className="text-sm font-semibold relative" onClick={() => setOpenDate(open => !open)}>
//           {`${format(dates[0].startDate, "dd/MM/yy")} - ${format(dates[0].endDate, "dd/MM/yy")}`}
//         </div>
//         {openDate && (
//           <div className='absolute top-16 -right-16'>
//             <DateComponent setOpen={setOpenDate} dates={dates} setDates={setDates} />
//           </div>
//         )}
//         <div className="text-gray-400 px-1">|</div>
//         <div className="text-sm font-semibold relative" onClick={() => setOpenOptions(open => !open)}>
//           {`${options.room} Room · ${options.guests} Guests`}
//         </div>
//         {openOptions && (
//           <div className='w-52 absolute top-16 -right-5 z-10'>
//             <AddGuestsComponent
//               setOpen={setOpenOptions}
//               setOptions={setOptions}
//               rooms={rooms}
//               setRooms={setRooms}
//             />
//           </div>
//         )}
//       </div>
//       <div className="border p-3.5 my-4" onClick={()=>setOpenChooseRoom(open=>!open)}>
//         select room
//       </div>
//       {openChooseRoom &&
//         <ChooseRoomModal setOpen={setOpenChooseRoom} hotelId={id} selectedRooms={selectedRooms}
//           setSelectedRooms={setSelectedRooms} isAvailable={isAvailable} setTotalPrice={setTotalPrice}
//           maxRooms={options.room}
//         />
//       }
//       {totalPrice>0 && (
//       <div className="my-4" >
//         <h3 className="text-lg font-semibold">Price Details</h3>
//         <div className="flex justify-between pt-3">
//           <span className="text-sm">
//             Rs. {totalPrice} X {totalNights} nights
//           </span>
//           <p className="text-base font-medium">
//             Rs. {totalPriceWithNights} /-
//           </p>
//         </div>
//         <div className="flex justify-between py-5 border-b-2 border-dotted border-gray-500">
//           <span className="text-sm">
//             Taxes(18% GST)
//           </span>
//           <p className="text-base font-medium">
//             Rs. {taxAmount} /-
//           </p>
//         </div>
//         <div className="flex justify-between pt-5">
//           <span className="text-base font-medium">
//             Total Amount
//           </span>
//           <p className="text-base font-medium">
//             Rs. {totalPriceIncludeTax} /-
//           </p>
//         </div>
//       </div>
//         )}
//       <div className="my-4">
//         <button onClick={handleBooking} type='button' disabled={!totalPrice}
//           className={`rounded-lg text-white w-full p-3 my-3
//           ${!totalPrice ? "bg-slate-200 cursor-not-allowed" : "bg-fuchsia-500 hover:bg-indigo-950"}`}
//         >
//           Book Now
//         </button>
//       </div>
//     </div>
//   )
// }
// export default BookingWidget


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { differenceInCalendarDays, format } from "date-fns";
import { addDays } from 'date-fns';
import DateComponent from './DateComponent';
import AddGuestsComponent from './AddGuestsComponent';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import ChooseRoomModal from './ChooseRoomModal';
import axios from "../services/axios";
import useFetch from '../hooks/useFetch';
import { loadStripe } from '@stripe/stripe-js';

const BookingWidget = ({hotel}) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); 
  const { selectedDates, selectedOptions, searchDispatch } = useContext(SearchContext);
  let userData;
  if (user) {
    const { data } = useFetch(`/users/${user?._id}`); 
    userData = data;
  }
  
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(selectedDates || [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(selectedOptions || {
    room: 1,
    guests: 1
  });
  const [rooms, setRooms] = useState([{ room: options.room, guests: options.guests }]);
  useEffect(() => {
    setDates(selectedDates || [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection'
      }
    ]);
    setOptions(selectedOptions || {
      room: 1,
      guests: 1
    });
  }, [selectedDates, selectedOptions]);
  
  useEffect(() => {
    searchDispatch({ type: "NEW_SEARCH", payload: { dates, options } });
  }, [dates, options, searchDispatch]);
 
  const [openChooseRoom, setOpenChooseRoom] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const getNumberOfNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const noOfNights = differenceInCalendarDays(end, start);
    return noOfNights;
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const totalNights = getNumberOfNights(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await axios.get(`/users/${user._id}`);
        const userWallet = response.data;
        setWallet(userWallet.wallet || 0); 
      } catch (error) {
        console.error('Error fetching user wallet:', error);
      }
    };
    if(user) fetchUserWallet();
  }, []);

  const totalPriceWithNights = totalPrice * totalNights;
  const taxAmount = totalPriceWithNights * 18 / 100;
  const totalPriceIncludeTax = (totalPriceWithNights + taxAmount).toFixed(2);

  const [isWalletApplied, setIsWalletApplied] = useState(false);
  const handleWallet = (e) => {
    const checked = e.target.checked;
    const value = e.target.value; 
    const walletBalance = userData?.wallet;
    let balanceAmount = 0;
    if (checked) {
      const walletAmountUsed = Math.min(totalPriceIncludeTax, walletBalance); 
      balanceAmount = (totalPriceIncludeTax - walletAmountUsed).toFixed(2); 
      setTotalAmount(balanceAmount);
      setWallet(walletBalance - walletAmountUsed);
      setIsWalletApplied(true);
    } else {
      setTotalAmount(totalPriceIncludeTax);
      setWallet(walletBalance);
      setIsWalletApplied(false);
    }
  }
  const total = totalAmount ? totalAmount : totalPriceIncludeTax;
  
  //new handlebookingwithwallet
  const handleBooking = async() => {
    if (user) {
      try {
        if (total>0) { 
          const stripe = await loadStripe('pk_test_51NpFlsSBKhqPZUqdQwvAlZNY3ulJj3Aph8XN9CfZRHbGyCzMOAWkHOhrMnrltGOEhCc7xbShQHXq0FgbBQgxKYR100H8uVUmof');
          const bookingData = {
            hotel: hotel._id,
            checkInDate: dates[0].startDate,
            checkOutDate: dates[0].endDate,
            noOfGuests: options.guests,            
            selectedRooms,
            totalAmount: totalPriceIncludeTax,
            isWalletApplied,
            balanceTotal:total,
            dates: allDates,
            wallet:wallet
          };
          const stripeData = {
            user,
            hotelId:hotel._id,          
            price: total,
            bookingData
          };
          const response = await axios.post(`/bookings/${user._id}/create-checkout-session`,stripeData); 
          const session = response.data.id; 
          const result = stripe.redirectToCheckout({
            sessionId: session
          }); 
        } else {
          const bookingData = {
            user: user._id,
            hotel: hotel._id,
            checkInDate: dates[0].startDate,
            checkOutDate: dates[0].endDate,
            noOfGuests: options.guests,
            selectedRooms,
            totalAmount: totalPriceIncludeTax,
            balanceTotal:total,
            dates: allDates,
            wallet: wallet,
          };
          const { data } = await axios.post(`/bookings/${user._id}/book-property`, bookingData); 
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            transition: Flip,
            autoClose: 2000
          });
          navigate('/account/success');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } else {
      toast.warn("Please login to book", {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      navigate('/login');
    }
  };
  
  return (
    <div>
      <div className="border flex items-center justify-between p-3.5">
        <div className="text-sm font-semibold relative" onClick={() => setOpenDate(open => !open)}>
          {`${format(dates[0].startDate, "dd/MM/yy")} - ${format(dates[0].endDate, "dd/MM/yy")}`}
        </div>
        {openDate && (
          <div className='absolute top-16 -right-16'>
            <DateComponent setOpen={setOpenDate} dates={dates} setDates={setDates} />
          </div>
        )}
        <div className="text-gray-400 px-1">|</div>
        <div className="text-sm font-semibold relative" onClick={() => setOpenOptions(open => !open)}>
          {`${options.room} Room · ${options.guests} Guests`}
        </div>
        {openOptions && (
          <div className='w-52 absolute top-16 -right-5 z-10'>
            <AddGuestsComponent
              setOpen={setOpenOptions}
              setOptions={setOptions}
              rooms={rooms}
              setRooms={setRooms}
            />
          </div>
        )}
      </div>
      <div className="border p-3.5 my-4" onClick={()=>setOpenChooseRoom(true)}>
        select room
      </div>
      {openChooseRoom &&
        <ChooseRoomModal setOpen={setOpenChooseRoom} hotelId={id} selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms} isAvailable={isAvailable} setTotalPrice={setTotalPrice}
          maxRooms={options.room}
        />
      }
      {totalPrice>0 && (      
        <div className="my-4" >
          <h3 className="text-lg font-semibold">Price Details</h3>
          <div className="flex justify-between pt-3">
            <span className="text-sm">
              Rs. {totalPrice} X {totalNights} nights 
            </span>
            <p className="text-base font-medium">
              Rs. {totalPriceWithNights} /-
            </p>
          </div>
          <div className="flex justify-between py-5 border-b-2 border-dotted border-gray-500">
            <span className="text-sm">
              Taxes(18% GST)
            </span>
            <p className="text-base font-medium">
              Rs. {taxAmount} /-
            </p>
          </div>

          {userData?.wallet > 0 && 
            <div className="flex justify-between py-5 border-b-2 border-dotted border-gray-500">
              <div className="flex items-center">
                <input type="checkbox" value={wallet} onChange={handleWallet}/>
                <span className="text-sm pl-2">
                  Wallet Amount
                </span>
              </div>
              <p className="text-base font-medium">
                Rs. {(wallet).toFixed(2)} /- 
              </p>
            </div>
          }

          <div className="flex justify-between pt-5">
            <span className="text-base font-medium">
              Total Amount
            </span>
            <p className="text-base font-medium">
              {/* Rs. {totalPriceIncludeTax} /- */}
               Rs. {total} /-
            </p>
          </div>
        </div>
      )}
      <div className="my-4">
        <button onClick={handleBooking} type='button' disabled={!totalPrice}
          className={`rounded-lg text-white w-full p-3 my-3  
          ${!totalPrice ? "bg-slate-200 cursor-not-allowed" : "bg-fuchsia-500 hover:bg-indigo-950"}`}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
export default BookingWidget

