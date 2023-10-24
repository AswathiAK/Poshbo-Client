import React from 'react'
import { Link } from 'react-router-dom';
import success from "../assets/success.png";

const PaymentSuccessPage = () => {
  return (
    <div className='grid place-items-center w-full lg:h-screen h-full font-raleway bg-[#F7F7F7]'>
      <div className='max-w-5xl rounded flex flex-col'>
        <span className='text-green-600 text-5xl'>Payment successful</span>
        <div className='flex justify-end items-center mx-auto my-10 w-60'>
          <img src={success} alt="success" />
        </div>
        <div className=' mx-auto'>
          <Link to="/account/bookings" className='text-xl text-green-700 underline'>
            Go to Bookings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
