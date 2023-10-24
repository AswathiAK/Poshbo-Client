import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/poshbo.svg";
import AccountMenu from './AccountMenu';

const UserHeader = () => {
  const [openHamburger, setOpenHamburger] = useState(false);  
  const hamburgerMenuItems = [
    { text: 'Log in', link: '/login' },
    { text: 'Sign up', link: '/register' },
    { text: 'List your property', link: '/host/home' },
    { text: 'Help center', link: '#' }
  ];  
  return (
    <header
      className=" border-b border-gray-300 px-4 md:px-20 flex items-center justify-between h-20 sticky top-0 z-10 bg-white"
    >
      <div className="bg-orang-500 w-[570px]">
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-40'/>
        </Link>
      </div>    
      <div className="hidden sm:flex items-center w-[570px] justify-end">
        <div className="text-sm font-medium hover:rounded-full hover:bg-neutral-100 p-3 mr-3">
          <Link to={'/host/home'}>List your property</Link> 
        </div>        
        <AccountMenu />        
      </div> 
      {/* Hamburgur menu */}
      <div className="flex sm:hidden ">
        <button type='button' onClick={()=>setOpenHamburger(!openHamburger)}>
          <span className='sr-only'>Open Main menu</span>
          {openHamburger ? <CloseIcon /> : <MenuIcon />} 
        </button>
        {/* Hamburgur menu end */}
        {/* Mobile menu */}
        {openHamburger ? (
          <div className="absolute top-20 rounded-md right-0 p-5 bg-white w-screen">
            {hamburgerMenuItems.map((item, index) => (
              <Link to={item.link} key={index} className=" hover:bg-gray-100 block px-3 py-3 rounded-md text-md">
                {item.text}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {/* mobile menu end */}
    </header>
  )
}

export default UserHeader
