import React, { useContext, useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast, Flip } from 'react-toastify';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MessageModal = ({ receiver, open, setOpen }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    try {
      const chatUsers = {
        senderId: user._id,
        receiverId: receiver
      };
      const { data } = await axios.post('/chats', chatUsers); 
      const messageData = {
        chatId: data._id,
        senderId: user._id,
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
  };

  return (
    <div className=''>      
      <BootstrapDialog
        onClose={()=>setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open} 
      >
        <DialogTitle sx={{ m: 0, p: 2 , textAlign:'center', fontWeight:'bold'}} id="customized-dialog-title">
          Have any queries? Message the host
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <main className='flex justify-center'>
            <div className=" border p-4 border-neutral-300 rounded-xl w-auto sm:w-[566px] "> 
              <div className="mb-3">
                <label className='font-semibold'>Your message</label>
                <textarea name='message' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)} 
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-2 hover:bg-indigo-950"
              >
                Send
              </button>
            </div>
          </main>
        </DialogContent>        
      </BootstrapDialog>
    </div>
  )
}

export default MessageModal
