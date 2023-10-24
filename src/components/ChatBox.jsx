import React, { useEffect, useRef, useState } from 'react'
import { toast, Flip } from "react-toastify";
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "../services/axios";
import { format } from 'timeago.js';

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage, socket, typing }) => {
  const commonClass = 'text-white rounded-lg max-w-xs w-fit break-words flex flex-col gap-2 p-3';
  const messageClass = `${commonClass} bg-lime-500`;
  const ownClass = `${commonClass} self-end bg-cyan-500`;
  const scroll = useRef();

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  
  //fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
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
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/messages/${chat._id}`);
        setMessages(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000,
        });
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const handleInput = (e) => {
    setNewMessage(e.target.value);
    socket.emit("typingStarted");
    if (typingTimeOut) clearTimeout(typingTimeOut);
    setTypingTimeOut(
      setTimeout(() => {
        socket.emit("typingStopped");
      }, 1000)
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage
    };
    //send message to database
    try {
      const { data } = await axios.post('/messages', message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
    //send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  //Always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  },[messages]);
  
  return (
    <>
      <div className="grid grid-rows-[100px_minmax(0,350px)_70px]">
        {chat ? (
          <>
            <div className="border-b p-4 ">
              <div className="flex items-center gap-3">
                <Avatar sx={{ width: 40, height: 40,  bgcolor: "black" }}>
                  {userData?.name[0]}
                </Avatar>
                <div className="text-lg font-semibold">
                  {userData?.name}
                </div>
              </div>
              {typing&& <div className='mt-3 text-xs'>typing...</div>}
            </div>
            <div className="flex flex-col gap-2 p-6 overflow-scroll border-b">
              {messages.map((message,index) => (
                <div key={index}
                  ref={scroll}
                  className={message.senderId === currentUser ? ownClass : messageClass}
                >
                  <span>{message.text}</span>
                  <span className='text-xs self-end'>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            <div className="flex h-16 items-center justify-between gap-3 p-3">
              <input type="text"
                className='w-full border rounded-xl py-2.5 px-3'
                value={newMessage}
                onChange={handleInput}
              />
              <button onClick={handleSend}
                className='rounded-full hover:bg-slate-200 hover:rounded-md p-2'
              >
                <SendIcon sx={{fontSize:'30px'}}/>
              </button>
            </div>
          </>
        ) : (
            <span className='text-3xl text-center text-gray-500 mt-10'>
              Tap on a chat to start conversation
            </span>
        )}
        
      </div>
    </>
  )
}

export default ChatBox

