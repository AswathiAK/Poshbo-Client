import { useEffect, useState } from "react";
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";

export const useFetchRecipientUser = (chat, userId) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const receiverId = chat?.members.find((id) => id !== userId);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/users/find/${receiverId}`);
        setRecipientUser(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000,
        });
      }
    };
    if(receiverId) getUser();
  }, [receiverId]);
  return recipientUser;
};