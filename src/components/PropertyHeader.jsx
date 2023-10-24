import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/poshbo.svg";
import { AuthContext } from '../context/AuthContext';
import HostAccountMenu from './HostAccountMenu';

const PropertyHeader = () => {
  const { user } = useContext(AuthContext);
  const [openHamburger, setOpenHamburger] = useState(false);  
  const hamburgerMenuItems = [
    { text: 'Sign in', link: '/login' },
    { text: 'Register', link: '/register' },
    { text: 'Help center', link: '#' }
  ];  
  return (
    <header
      className=" border-b border-gray-300 px-4 md:px-20 flex items-center justify-between h-20 sticky top-0 z-10 bg-white"
    >
      <div className="bg-orang-500 w-[570px]">
        <Link to={'/host/home'}>
          <img src={logo} alt="logo" className='w-40'/>
        </Link>
      </div>    
      <div className="hidden sm:flex items-center w-[570px] justify-end">
        {!user ? (
          <>
            <div className="text-md font-medium hover:bg-neutral-100 p-2 border border-violet-900 mr-2 text-violet-900">
              <Link to={'/login'}>Sign in</Link> 
            </div>
            <div className="text-md font-medium hover:bg-neutral-100 p-2 border border-violet-900 text-violet-900">
              <Link to={'/register'}>Register</Link> 
            </div>
          </>
        ): 
          <HostAccountMenu />        
        }
               
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

export default PropertyHeader
