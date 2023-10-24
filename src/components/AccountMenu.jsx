import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AccountMenu = () => {
  const menuItems = [
    { text: 'Log in', link: '/login' },
    { text: 'Sign up', link: '/register', borderBottom: '1px solid rgba(0,0,0,0.10)' },
    { text: 'List your property', link: '/host/home' },
    { text: 'Help center', link: '#' }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <AccountCircleIcon sx={{fontSize:'33px', color:'#666'}}/>
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
            mt: 2, width:'240px', borderRadius:'13px',
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
                pt: index === 2 ? 2 : 1,
                pb: 2,
                ...(item.borderBottom && { borderBottom: item.borderBottom })
              }}
            >
              {item.text}
              </MenuItem>
          </Link>
        ))}
      </Menu>            
    </div>
  )
}

export default AccountMenu
