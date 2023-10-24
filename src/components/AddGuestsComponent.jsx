// import React, { useEffect, useRef, useState, } from 'react';

// const AddGuestsComponent = () => {
//   const refOne = useRef(null);
//   const [open, setOpen] = useState(false);
//   const [options, setOptions] = useState({
//     room: 1,
//     guests: 1
//   });
//   const [rooms, setRooms] = useState([{ room: options.room, guests: options.guests }]);
  
//   useEffect(() => {
//     document.addEventListener("click", hideOnClickOutside, true);
//   }, []);
//   const hideOnClickOutside = (e) => {
//     if (refOne.current && !refOne.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };

//   const handleOptions = (index, name, operation) => {
//     setRooms(prevRooms => {
//       const updatedRooms = [...prevRooms];
//       updatedRooms[index] = {
//         ...updatedRooms[index],
//         guests: operation === 'inc' ? updatedRooms[index].guests + 1 : updatedRooms[index].guests - 1
//       };
//       const totalGuests = updatedRooms.reduce((total, room) => total + room.guests, 0);
//       setOptions(prevOptions => ({ ...prevOptions, [name]: totalGuests }));
//       return updatedRooms;
//     });
//   };
//   const handleAddRoom = () => {
//     const newRoom = rooms.length + 1;
//     setRooms(prevRooms => {
//       return [...prevRooms, { room: newRoom, guests: 1 }];
//     });
//     setOptions(prevOptions => {
//       const totalGuests = prevOptions.guests + 1;
//       return { ...prevOptions, guests: totalGuests, room: newRoom };
//     });
//   };
//   const handleDeleteRoom = (index) => {
//     setRooms(prevRooms => {
//       const updatedRooms = prevRooms.filter((room, i) => i !== index);
//       const totalGuests = updatedRooms.reduce((total, room) => total + room.guests, 0);
//       setOptions(prevOptions => ({ ...prevOptions, guests: totalGuests, room:prevOptions.room-1 }));
//       return updatedRooms;
//     });
//   };

//   return (
//     <div>
//       <div className="text-gray-400 hidden lg:flex" onClick={() => setOpen(open => !open)}>
//         {`${options.room} Room · ${options.guests} Guests`}
//       </div>
//       <div ref={refOne} className="absolute top-9 -right-14 w-[248px]">
//         {open &&
//           <div className="bg-white rounded-md border shadow-md mt-2">
//             <div className="flex mx-4 border-b items-center justify-around">
//               <div className="text-center pt-4 pb-3 text-sm font-semibold">Rooms</div>
//               <div className="text-center pt-4 pb-3 text-sm font-semibold">Guests</div>
//             </div>
//             {rooms.map((room, index) => (
//               <div className="mx-4 mt-4 pb-4 flex items-center justify-between border-b" key={index}>
//                 <div className="text-sm">{`Room ${index + 1}`}</div>
//                 <div className="flex gap-2 items-center pr-2">
//                   <button
//                     disabled={room.guests <= 1}
//                     className={`px-2 py-1 rounded-sm border
//                     ${room.guests <= 1 ? 'text-gray-300 border-zinc-300' : 'text-black border-zinc-400'}`}
//                     onClick={() => handleOptions(index, "guests", "dec")}
//                   >
//                     &minus;
//                   </button>
//                   <span className="text-md">
//                     {room.guests}
//                   </span>
//                   <button
//                     disabled={room.guests >= 3}
//                     className={`px-2 py-1 rounded-sm border
//                     ${room.guests >= 3 ? 'text-gray-300 border-zinc-300' : 'text-black border-zinc-400'}`}
//                     onClick={() => handleOptions(index, "guests", "inc")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className="flex items-center justify-between mx-4 py-2">
//               {rooms.length > 0 && (
//                 <div className="">
//                   <button disabled={rooms.length === 1}
//                     className={`pt-2 pb-3 text-sm ${rooms.length === 1 ? 'text-gray-400' : 'text-black'}`}
//                     onClick={() => handleDeleteRoom(rooms.length - 1)}
//                   >
//                     Delete Room
//                   </button>
//                 </div>
//               )}
//               <div className="">
//                 <button className='pt-2 pb-3 text-sm' onClick={handleAddRoom} >Add Room</button>
//               </div>
//             </div>
//           </div>
//         }
//       </div>
//     </div>
//   );
// };

// export default AddGuestsComponent


import React, { useEffect, useRef } from 'react';

const AddGuestsComponent = ({ setOpen, setOptions, rooms, setRooms }) => {  
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleOptions = (index, name, operation) => {
    setRooms(prevRooms => {
      const updatedRooms = [...prevRooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        guests: operation === 'inc' ? updatedRooms[index].guests + 1 : updatedRooms[index].guests - 1
      };
      const totalGuests = updatedRooms.reduce((total, room) => total + room.guests, 0);
      setOptions(prevOptions => ({ ...prevOptions, [name]: totalGuests }));
      return updatedRooms;
    });
  };
  const handleAddRoom = () => {
    const newRoom = rooms.length + 1;
    setRooms(prevRooms => {
      return [...prevRooms, { room: newRoom, guests: 1 }];
    });
    setOptions(prevOptions => {
      const totalGuests = prevOptions.guests + 1;
      return { ...prevOptions, guests: totalGuests, room: newRoom };
    });
  };
  const handleDeleteRoom = (index) => {
    setRooms(prevRooms => {
      const updatedRooms = prevRooms.filter((room, i) => i !== index);
      const totalGuests = updatedRooms.reduce((total, room) => total + room.guests, 0);
      setOptions(prevOptions => ({ ...prevOptions, guests: totalGuests, room:prevOptions.room-1 }));
      return updatedRooms;
    });
  };
  return (      
    <div ref={refOne}>
      <div className="bg-white rounded-md border shadow-md mt-2">
        <div className="flex mx-4 border-b items-center justify-around">
          <div className="text-center pt-4 pb-3 text-sm font-semibold">Rooms</div>
          <div className="text-center pt-4 pb-3 text-sm font-semibold">Guests</div>
        </div>
        {rooms?.map((room, index) => (
          <div className="mx-4 mt-4 pb-4 flex items-center justify-between border-b" key={index}>
            <div className="text-sm">{`Room ${index + 1}`}</div>
            <div className="flex gap-2 items-center pr-2">
              <button
                disabled={room.guests <= 1}
                className={`px-2 py-1 rounded-sm border
                  ${room.guests <= 1 ? 'text-gray-300 border-zinc-300' : 'text-black border-zinc-400'}`}
                onClick={() => handleOptions(index, "guests", "dec")}
              >
                &minus;
              </button>
              <span className="text-md">
                {room.guests}
              </span>
              <button
                disabled={room.guests >= 3}
                className={`px-2 py-1 rounded-sm border
                  ${room.guests >= 3 ? 'text-gray-300 border-zinc-300' : 'text-black border-zinc-400'}`}
                onClick={() => handleOptions(index, "guests", "inc")}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between mx-4 py-2">
          {rooms?.length > 0 && (
            <div className="">
              <button disabled={rooms.length === 1}
                className={`pt-2 pb-3 text-sm ${rooms.length === 1 ? 'text-gray-400' : 'text-black'}`}
                onClick={() => handleDeleteRoom(rooms.length - 1)}
              >
                Delete Room
              </button>
            </div>
          )}
          <div className="">
            <button className='pt-2 pb-3 text-sm' onClick={handleAddRoom} >Add Room</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGuestsComponent
