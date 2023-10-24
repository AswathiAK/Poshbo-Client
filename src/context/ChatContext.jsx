import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //Socket initialisation
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    }
  }, [user]);
  //add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  //Send message
  useEffect(() => {
    if (socket === null) return;
    const receiverId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, receiverId });
  }, [newMessage]);
  //Receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("receiveMessage", (data) => {
      if (currentChat?._id !== data.chatId) return;
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, currentChat]);

  //Get Chats for Conversations component
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
    if (user !== null) getChats();
  }, [user]);
  //For getting the current chat when click the conversation
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  
  //Fetching the messages of current chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/messages/${currentChat._id}`); 
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
    if (currentChat !== null) fetchMessages();
  }, [currentChat]);

  //Send a message and storing it in DB
  const sendTextMessage = useCallback(async (currentChatId, currentUser, textMessage, setTextMessage) => {
    if (!textMessage.trim()) {
      return;
    }
    const message = {
      chatId: currentChatId,
      senderId: currentUser,
      text: textMessage
    };
    try {
      const { data } = await axios.post('/messages', message);
      setNewMessage(data);
      setMessages((prev) => [...prev, data]);
      setTextMessage("");
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }, []);
    
  const createChatAndMessage = async (senderId, receiverId, message, setOpen) => {
    if (!message.trim()) {
      return;
    }
    try {
      const chatUsers = {
        senderId,
        receiverId
      };
      const { data } = await axios.post('/chats', chatUsers); 
      setChats((prev) => [...prev, data]);
      const messageData = {
        chatId: data._id,
        senderId: senderId,
        text: message
      };
      const response = await axios.post('/messages', messageData);
      toast.success('Message sent successfully', {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      setOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        updateCurrentChat, currentChat,
        messages, sendTextMessage,
        onlineUsers,
        createChatAndMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  )
  
}