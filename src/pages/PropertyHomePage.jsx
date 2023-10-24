import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarsIcon from '@mui/icons-material/Stars';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { AuthContext } from '../context/AuthContext';
import hotelBackground from "../assets/HotelBackground.jpg";
import { Footer, PropertyHeader } from '../components';

const PropertyHomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleProperty = () => {
    if (user) {
      navigate('/host/add_property');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <PropertyHeader />
      <main className="h-auto ">
        <div className="h-96">
          <img src={hotelBackground} alt="hotel background" className='h-full w-full object-cover'/>
        </div>
        <div className="bg-cyan-900">        
          <div className="px-4 md:px-20 text-center py-8 text-white text-5xl font-semibold">
            LIST YOUR PLACE ON POSHBO
            <p className='text-lg font-normal pt-3'>
              Global audience, Asia focus. Get the bookings you’ve been missing by listing for free on Poshbo, today!
            </p>
          </div>
          <div className="flex justify-center pb-8">
            <div className="w-1/2 py-3 px-8 rounded-lg border border-cyan-800 bg-white ">
              <h1 className="text-center text-2xl font-semibold"> Create new Listing </h1>
              <p className="py-3 text-md leading-loose font-thin">
                Single unit properties such as a home, apartment, or Multi-unit buildings such as a hotel, bed & 
                breakfast, serviced apartment, or rentable condominium buildings. Just pay 5% of your property earnings and
                top list your property.
              </p>
              <div className="flex justify-center">
                <button
                  className="my-3 rounded-lg bg-blue-900 hover:bg-blue-950 text-white p-3 justify-items-center"
                  onClick={handleProperty}
                >
                  List my property
                </button>
              </div>
            </div>
          </div>          
        </div>
        <div className="my-8 ">
          <div className="text-2xl text-center mb-5">So many reasons to list on Poshbo!</div>
          <div className="mb-4 flex flex-col md:flex-row justify-between md:px-40">
            <div className="p-5 bg-blue-100 w-full md:w-1/2 h-fit rounded-lg mb-5 md:mb-0 md:mr-5">  
              <div >
                <MonetizationOnIcon
                  sx={{
                    fontSize: '44px', color: 'white', padding: '8px', borderRadius: '50%', border: '1px solid lightblue',
                    backgroundColor:'#3f8dc2' 
                  }}                   
                />
              </div>  
              <h3 className='text-3xl font-sans mb-2.5 mt-5'>Get bookings fast</h3>
              <p className='text-sm'>
                Our statistics show that the majority of new listings receive a booking within the first 3 months of joining our 
                community.
              </p>
            </div>
            <div className="p-5 bg-green-100 w-full md:w-1/2 h-fit rounded-lg ">
              <div >
                <StarsIcon
                  sx={{
                    fontSize: '44px', color: 'white', padding: '8px', borderRadius: '50%', border: '1px solid lightgreen',
                    backgroundColor:'#3ca03c' 
                  }}                   
                />
              </div>  
              <h3 className='text-3xl font-sans mb-2.5 mt-5'>Stand out from the competition</h3>
              <p className='text-sm'>
                New listings get a special boost in visibility. Keep the spotlight on your property with a range of options to  
                increase your exposure.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:px-40">
            <div className="p-5 w-full md:w-1/3 bg-red-200 rounded-lg mb-5 md:mb-0 ">
              <div >
                <PeopleAltIcon
                  sx={{
                    fontSize: '44px', color: 'white', padding: '8px', borderRadius: '50%', border: '1px solid lightred',
                    backgroundColor:'#ca1313ea' 
                  }}                   
                />
              </div> 
              <h3 className='text-2xl font-sans mb-2.5 mt-5'>Reach a global audience</h3>
              <p className='text-sm'>
                More than 10 million Poshbo users from around the world will get to see your property.
              </p>
            </div>
            <div className="p-5 w-full md:w-1/3 bg-violet-100 rounded-lg mb-5 md:mb-0 md:mx-5">
              <div >
                <ApartmentIcon
                  sx={{
                    fontSize: '44px', color: 'white', padding: '8px', borderRadius: '50%', border: '1px solid darkpink',
                    backgroundColor:'#941178ea' 
                  }}                   
                />
              </div> 
              <h3 className='text-2xl font-sans mb-2.5 mt-5'>List any property type</h3>
              <p className='text-sm'>
                List a hotel, apartment, house, and so many other property types for free on Poshbo.
              </p>
            </div>
            <div className="p-5 w-full md:w-1/3 bg-orange-100 rounded-lg">
              <div >
                <HeadsetMicIcon
                  sx={{
                    fontSize: '44px', color: 'white', padding: '8px', borderRadius: '50%', border: '1px solid lightorange',
                    backgroundColor:'#eba420f5' 
                  }}                   
                />
              </div> 
              <h3 className='text-2xl font-sans mb-2.5 mt-5'>Support</h3>
              <p className='text-sm'>
                Find support through online material, the support widget on Poshbo and Host Manage, and email and chat.
              </p>
            </div>
          </div>
          <div className="py-16">
            <div className="mx-4 md:mx-[89.5px] px-4">
              <h1 className='mb-[30px] text-center font-medium text-2xl font-sans'>
                All you have to do
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="px-4 col-md-3 col-xs-12 w-full md:w-1/4 mb-5 md:mb-0">                  
                  <img
                    src="https://img.agoda.net/images/nha_host_marketing/Sign_in_step.png"
                    alt="login"
                    className='mb-5 mx-auto'                      
                  />
                  <p className='mb-2.5 text-center font-sans text-md font-medium'>Sign in or sign up for a Poshbo account</p>
                </div>
                <div className="px-4 col-md-3 col-xs-12 w-full md:w-1/4 mb-5 md:mb-0">                  
                  <img
                    src="https://img.agoda.net/images/nha_host_marketing/Upload_step.png"
                    alt="upload"
                    className='mb-5 mx-auto'                      
                  />
                  <p className='mb-2.5 text-center font-sans text-md font-medium'>Upload your property details and pictures</p>
                </div>
                <div className="px-4 col-md-3 col-xs-12 w-full md:w-1/4 mb-5 md:mb-0">
                  <img
                    src="https://img.agoda.net/images/nha_host_marketing/Set_prices_and_dates_step.png"
                    alt="pricing"
                    className='mb-5 mx-auto'                      
                  />
                  <p className='mb-2.5 text-center font-sans text-md font-medium'>Set your prices and available dates</p>
                </div>
                <div className="px-4 col-md-3 col-xs-12 w-full md:w-1/4">
                  <img
                    src="https://img.agoda.net/images/nha_host_marketing/Go_live_step.png"
                    alt="listing"
                    className='mb-5 mx-auto'                      
                  />
                  <p className='mb-2.5 text-center font-sans text-md font-medium'>
                    See your listing go live in front of millions of travelers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default PropertyHomePage
