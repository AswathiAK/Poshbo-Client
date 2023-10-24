import React from 'react'
import CommonHeader from './CommonHeader';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <CommonHeader />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout
