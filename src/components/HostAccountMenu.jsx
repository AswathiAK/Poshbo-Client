import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Stack } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";

const HostAccountMenu = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuItems = [
    { text: 'View my properties', link: '/host/view_properties' },
    { text: 'Add new property', link: '/host/add_property' },
    { text: 'Messages', link: '/host/messages' },
    { text: 'My Account', link: '/host/account/personal' }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userLogout = async () => {
    try {
      const { data } = await axios.post('/users/logout'); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      dispatch({ type: "LOGOUT" });
      navigate('/host/home');
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };

  return (
    <div className="border border-gray-300 rounded-full pl-3 pr-1 py-1 hover:shadow-md">
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disableelevation="true"
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: 'transparent', },
          '&:active':{ backgroundColor: 'transparent' }
        }}
      >
        <MenuIcon sx={{fontSize:'20px', color:'#444',marginRight:'8px'}}/>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 14, bgcolor: "black" }}>
            {user.name.split('')[0]}
            {/* {user.role==='host' && user.name.split('')[0]} */}
          </Avatar>
        </Stack>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2, width:'200px', borderRadius:'13px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 0,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },                  
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <MenuItem
              onClick={handleClose}
              sx={{
                fontSize: '14px',
                pb: 2,
              }}
            >              
              {item.text}
            </MenuItem>
          </Link>
        ))}
        <MenuItem onClick={() => { handleClose(); userLogout(); }} sx={{ fontSize: '14px', pt: 1, pb: 2 }}>          
          Logout
        </MenuItem>
      </Menu>            
    </div>
  )
}

export default HostAccountMenu
