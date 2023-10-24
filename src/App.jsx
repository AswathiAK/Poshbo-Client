import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage,
  HomePage, UserProfilePage, ErrorPage,
  PropertyHomePage, AddPropertyPage, ViewPropertiesPage, ViewSinglePropertyPage,
  EditPropertyPage,
  HostProfilePage, HostMessagePage, SingleHotelPage, SearchResultsHotelsPage, GuestMessagePage, PaymentSuccessPage
} from "./pages";
import { EarningsofHotel, HotelBookings, Layout } from './components';
import { GuestPrivateRoute, GuestProtectedRoute, HostPrivateRoute, HostProtectedRoute } from './services/ProtectedRoute';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot_password' element={<ForgotPasswordPage />} />
        <Route path='/reset_password/:token/:id' element={<ResetPasswordPage />} />

        <Route path='/' element={<Layout />} >
          <Route element={<GuestPrivateRoute />}>
            <Route index element={<HomePage />} />
            <Route path='/search_results' element={<SearchResultsHotelsPage />} />
            <Route path='/:id' element={<SingleHotelPage />} />
          </Route>          
          <Route element={<GuestProtectedRoute />}>
            <Route path='/account/:active' element={<UserProfilePage />} />  
            <Route path='/account/inbox/messages' element={<GuestMessagePage />} />
            <Route path='/account/success' element={<PaymentSuccessPage />} />
          </Route>
        </Route>
       
        <Route element={<HostPrivateRoute />}>
          <Route path='/host/home' element={<PropertyHomePage />} />       
        </Route>
        <Route element={<HostProtectedRoute />}>
          <Route path='/host/add_property' element={<AddPropertyPage />} />
          <Route path='/host/view_properties' element={<ViewPropertiesPage />} />
          <Route path='/host/view_property/:id' element={<ViewSinglePropertyPage />} />
          <Route path='/host/edit_property/:id' element={<EditPropertyPage />} />        
          <Route path='/host/account/:active' element={<HostProfilePage />} />
          <Route path='/host/messages' element={<HostMessagePage />} />
          <Route path='/host/:bookingType/:hotelId' element={<HotelBookings />} />
          <Route path='/host/earnings/:id' element={<EarningsofHotel />} />
        </Route>
        
        <Route path='*' element={<ErrorPage />} />   
      </Routes>
    </>
  )
}

export default App

