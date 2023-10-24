// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { toast, Flip } from "react-toastify";
// import SendIcon from '@mui/icons-material/Send';
// import useFetch from '../hooks/useFetch';
// import { Conversations, Footer, Message, PropertyHeader } from '../components';
// import { AuthContext } from '../context/AuthContext';
// import axios from "../services/axios";

// import { io } from "socket.io-client";

// const HostMessagePage = () => {
  
//   const navigate = useNavigate();
//   const { hotelId } = useParams();
//   const { data, loading, error } = useFetch(`/hotels/${hotelId}`);
//   const scrollRef = useRef();

//   const { user } = useContext(AuthContext);
//   const [conversations, setConversations] = useState([]);
//   const socket = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     socket.current = io("ws://localhost:4000");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);
//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       console.log('getusers',users);
//     })
//   }, [user]);
  
//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get(`/chats/${user._id}`);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(`/messages/${currentChat?._id}`);
//         setMessages(res.data);
//       } catch (error) {
//         const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//         toast.error(errorMessage, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000,
//         });
//       }
//     };
//     if(currentChat!==null) getMessages();
//   }, [currentChat]);

//   const handleSubmitMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) {
//       return;
//     }
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       chatId: currentChat._id
//     };
//     const receiverId = currentChat.members.find(member => member !== user._id);
//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage
//     });
//     try {
//       const { data } = await axios.post('/messages', message);
//       setMessages([...messages, data]);
//       setNewMessage("");
//     } catch (error) {
//       const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//       toast.error(errorMessage, {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Flip,
//         autoClose: 2000
//       });
//     }
//   };
  
//   // useEffect(() => {
//   //   scrollRef.current?.scrollIntoView({
//   //     behaviour:"smooth"
//   //   })
//   // }, [messages]);
  
// const [activeConversation, setActiveConversation] = useState(null);

//   return (
//     <div>
//       <PropertyHeader />
//       <main className="min-h-screen">
//         <div className="flex ">
//         {/* Sticky left panel */}
//           <div className="w-1/4 border-r">
//             <div className="h-20 flex items-center px-5 border-b bg-white sticky top-20 z-10">
//               <h3 className="font-bold text-lg ">Messages</h3>
//             </div>
//             {/* <div className="py-6 px-5 h-screen overflow-y-scroll">
//               {conversations.map((chat, index) => (
//                 <div key={index} onClick={()=>setCurrentChat(chat)}>
//                   <Conversations conversation={chat} currentUser={user} />
//                 </div>
//               ))}
//             </div> */}
//             <div className="py-6 px-5 h-screen overflow-y-scroll">
//               {conversations.map((chat, index) => (
//                 <div key={index} onClick={() => { setCurrentChat(chat); setActiveConversation(chat) }}>
//                   <Conversations conversation={chat} currentUser={user}
//                     setActiveConversation={setActiveConversation} activeConversation={activeConversation}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//         {/* Middle content panel */}
//         <div className="w-1/2 border-r sticky top-0 flex flex-col" >
//           <div className="h-20 flex items-center justify-left px-5 border-b bg-white sticky top-20 z-10">
//             {/* <h3 className="font-bold text-lg">data.owner?.name</h3> */}
//           </div>
//           <div className="h-screen overflow-y-scroll relative" >
//               {
//                 currentChat ?
//                   <>
//                     <div className="py-6 px-10" >
//                       {messages.map((message, index) => (
//                         <div key={index}
//                           // ref={scrollRef}
//                         >
//                           <Message message={message} own={message.sender === user._id} />
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                   :
//                   <span className='absolute top-16 text-3xl text-gray-400 px-8 cursor-default'>
//                     Open a conversation to start a chat
//                   </span>
//               }
//             </div>
//             <div className="sticky flex items-center bottom-0 z-10 p-5 bg-white">
//               <input onChange={(e)=>setNewMessage(e.target.value)}
//                 type="text"
//                 placeholder='Type a message'
//                 className='border rounded-3xl w-[580px] py-2.5 px-3'
//                 value={newMessage}
//                 />
//               <button onClick={handleSubmitMessage}
//                 className=' bg-fuchsia-400 rounded-full hover:bg-blue-950 hover:rounded-full p-2'
//               >
//                 <SendIcon sx={{color:'white'}} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default HostMessagePage

//original hostmessagepage without notification
// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { toast, Flip } from "react-toastify";
// import { ChatBox, Conversations, Footer, PropertyHeader } from '../components';
// import { AuthContext } from '../context/AuthContext';
// import axios from "../services/axios";
// import { io } from "socket.io-client";

// const HostMessagePage = () => {
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
//   }, [user]);

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
//   //send message
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
//     const chatMember = chat.members.find((member) => member !== user._id); 
//     const online = onlineUsers.find((user) => user.userId === chatMember); 
//     return online ? true : false;
//   };

//   return (
//     <div>
//       <PropertyHeader />
//       <main className="min-h-screen px-4 md:px-20 mt-10">
//         <div className="grid grid-cols-[300px_1fr] gap-4 relative">
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-4 rounded-xl p-4 h-auto min-h-[80vh] overflow-scroll border border-gray-300">
//               <h2>Chats</h2>
//               <div className="flex flex-col gap-2">
//                 {chats.map((chat) => (
//                   <div key={chat._id} onClick={() => setCurrentChat(chat)}>
//                     <Conversations chat={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="border rounded-lg border-gray-300">
//             <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage}
//               receiveMessage={receiveMessage}
//             />
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default HostMessagePage


import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast, Flip } from "react-toastify";
import { ChatBox, Conversations, Footer, PropertyHeader } from '../components';
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";
import { io } from "socket.io-client";

const HostMessagePage = () => {
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
  }, [user]);

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
  //send message
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
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId); console.log('ischatopen',isChatOpen);
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
    <div>
      <PropertyHeader />
      <main className="min-h-screen px-4 md:px-20 mt-10">
        <div className="grid grid-cols-[300px_1fr] gap-4 relative">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-xl p-4 h-auto min-h-[80vh] overflow-scroll border border-gray-300">
              <h2>Chats</h2>
              <div className="flex flex-col gap-2">
                {chats.map((chat) => (
                  <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                    <Conversations chat={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} notifications={notifications}
                      setNotifications={setNotifications}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border rounded-lg border-gray-300">
            <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} 
              receiveMessage={receiveMessage} socket={socket.current} typing={typing}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostMessagePage
