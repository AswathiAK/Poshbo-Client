//the original guestmessage
// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { toast, Flip } from "react-toastify";
// import { ChatBox, Conversations } from "../components";
// import { AuthContext } from '../context/AuthContext';
// import axios from "../services/axios";
// import { io } from "socket.io-client";

// const GuestMessagePage = () => {
//   const { user } = useContext(AuthContext);
//   const [chats, setChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receiveMessage, setReceiveMessage] = useState(null);
//   const socket = useRef();
   
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await axios.get(`/chats/${user._id}`);
//         setChats(data);
//       } catch (error) {
//         const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//         toast.error(errorMessage, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000,
//         });
//       }
//     };
//     getChats();
//   }, [user._id]);

//   const disconnectSocket = () => {
//     if (socket.current) {
//       socket.current.disconnect();
//     }
//   };

//   useEffect(() => {
//     socket.current = io("http://localhost:4000");
//     socket.current.emit("addNewUser", user._id);
//     socket.current.on("getOnlineUsers", (users) => {
//       setOnlineUsers(users);
//     });
//     return () => {
//       disconnectSocket();
//     };
//   }, [user]);
//   //send message to socket server
//   useEffect(() => {
//     if (sendMessage !== null) {
//       socket.current.emit("sendMessage", sendMessage);
//     }
//   }, [sendMessage]);
//   //receive message from socket server
//   useEffect(() => {
//     socket.current.on("receiveMessage", (message) => {
//       setReceiveMessage(message);
//     });
//   }, []);
//   //check online status
//   const checkOnlineStatus = (chat) => {
//     const chatMember = chat.members.find((member) => member !== user._id); console.log('chatmember',chatMember);
//     const online = onlineUsers.find((user) => user.userId === chatMember); console.log('online=',online);
//     return online ? true : false;
//   };

//   return (
//     <main className="min-h-screen px-4 md:px-20 mt-10">
//       <div className="grid grid-cols-[300px_1fr] gap-4 relative">
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-4 rounded-xl p-4 h-auto min-h-[80vh] overflow-scroll border border-gray-300">
//             <h2>Chats</h2>
//             <div className="flex flex-col gap-2">
//               {chats.map((chat) => (
//                 <div key={chat._id} onClick={()=>setCurrentChat(chat)}>
//                   <Conversations chat={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="border rounded-lg border-gray-300 ">
//           <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage}
//             receiveMessage={receiveMessage}
//           />
//         </div>
//       </div>
//     </main>
//   )
// }

// export default GuestMessagePage


//this is with notification setup trial
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast, Flip } from "react-toastify";
import { ChatBox, Conversations } from "../components";
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";
import { io } from "socket.io-client";

const GuestMessagePage = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();
   
  const [notifications, setNotifications] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(`/chats/${user._id}`);
        setChats(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000,
        });
      }
    };
    getChats();
  }, [user._id]);

  const disconnectSocket = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.emit("addNewUser", user._id);
    socket.current.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      disconnectSocket();
    };
  }, [user]);
  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);
  //receive message from socket server
  useEffect(() => {
    socket.current.on("receiveMessage", (message) => {
      setReceiveMessage(message);
    });
    socket.current.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId); 
      if (isChatOpen) {
        setNotifications(prev => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications(prev => [res, ...prev]);
      }
    });

    socket.current.on("typingStartedFromServer", () => {
      setTyping(true);
    });
    socket.current.on("typingStoppedFromServer", () => {
      setTyping(false);
    });

  }, [currentChat]); 
  //check online status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id); 
    const online = onlineUsers.find((user) => user.userId === chatMember); 
    return online ? true : false;
  };

  return (
    <main className="min-h-screen px-4 md:px-20 mt-10">
      <div className="grid grid-cols-[300px_1fr] gap-4 relative">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl p-4 h-auto min-h-[80vh] overflow-scroll border border-gray-300">
            <h2>Chats</h2>
            <div className="flex flex-col gap-2">
              {chats.map((chat) => (
                <div key={chat._id} onClick={()=>setCurrentChat(chat)}>
                  <Conversations chat={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} notifications={notifications} 
                    setNotifications={setNotifications}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border rounded-lg border-gray-300 ">
          <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} 
            receiveMessage={receiveMessage} socket={socket.current} typing={typing}
          />
        </div>
      </div>
    </main>
  )
}

export default GuestMessagePage
