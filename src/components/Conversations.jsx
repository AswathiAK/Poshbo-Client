// import React, { useEffect, useState } from 'react'
// import { Avatar } from '@mui/material';
// import { toast, Flip } from "react-toastify";
// import axios from "../services/axios";

// const Conversations = ({ chat, currentUserId, online }) => {
//   const [userData, setUserData] = useState(null);
//   useEffect(() => {
//     const userId = chat?.members.find((id) => id !== currentUserId);
//     const getUserData = async () => {
//       try {
//         const { data } = await axios.get(`/users/find/${userId}`);
//         setUserData(data);
//       } catch (error) {
//         const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//         toast.error(errorMessage, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000,
//         });
//       }
//     };
//     getUserData();
//   }, []);
  
//   return (
//     <div className=' rounded-lg bg-gray-200 hover:bg-gray-300 mt-3 p-3 cursor-pointer'>
//       <div className="relative flex items-center gap-2">
//         <div className="mr-3">
//           <Avatar sx={{ width: 40, height: 40,  bgcolor: "black" }}>
//             {userData?.name[0]}
//           </Avatar>
//           {online &&
//             <span className="inline-block rounded-full h-3 w-3 bg-green-600 absolute top-0 left-8"></span>
//           }
//         </div>
//         <div className="text-lg font-semibold">
//           {userData?.name}
//         </div>
//         <div className="absolute bottom-1 right-1
//           flex items-center justify-center bg-teal-600 h-5 w-5 rounded-full
//           text-xs font-semibold text-white"
//         >
//           1
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Conversations


//for notification count
import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";

const Conversations = ({ chat, currentUserId, online, notifications, setNotifications }) => { 
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/users/find/${userId}`);
        setUserData(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000,
        });
      }
    };
    getUserData();
  }, []);
  
  const notificationClass='absolute bottom-1 right-1 flex items-center justify-center bg-teal-600 h-5 w-5 rounded-full text-xs font-semibold text-white'
  console.log('notifcations',notifications);
  const unReadNotifications = notifications.filter((n) => n.isRead === false); console.log('unreadnotif',unReadNotifications);
  const thisUserNotifications = unReadNotifications?.filter((n) => {
    return n.senderId === userData?._id;
  });

  const markThisUserNotificationsAsRead = (thisUserNotifications, notifications) => {
    const mNotifications = notifications.map((el) => {
      let notification;
      thisUserNotifications.forEach(n => {
        if (n.senderId === el.senderId) {
          notification = { ...n, isRead: true };
        } else {
          notification = el;
        }
      });
      return notification;
    }); console.log('modifynotification',mNotifications);
    setNotifications(mNotifications);
  };
  
  return (
    <div className=' rounded-lg bg-gray-200 hover:bg-gray-300 mt-3 p-3 cursor-pointer'
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="relative flex items-center gap-2">
        <div className="mr-3">
          <Avatar sx={{ width: 40, height: 40,  bgcolor: "black" }}>
            {userData?.name[0]}
          </Avatar>
          {online &&
            <span className="inline-block rounded-full h-3 w-3 bg-green-600 absolute top-0 left-8"></span>
          }
        </div>
        <div className="text-lg font-semibold">
          {userData?.name}
        </div>
        <div className={thisUserNotifications?.length > 0 ? notificationClass : ""}
        >
          {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
        </div>
      </div>
    </div>
  )
}

export default Conversations
