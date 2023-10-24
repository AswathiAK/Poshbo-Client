import React from 'react'
import { useParams } from 'react-router-dom';
import { BookingsHotelSide, Footer, HostEarnings, PersonalInfo, PropertyHeader, SidebarHostAccount, UserSecurity } from '../components'

const HostProfilePage = () => {
  const { active } = useParams();

  return (
    <div>
      <PropertyHeader />
      <main className='min-h-screen px-4 md:px-20'>
        <div className="my-8 flex items-start gap-5">
          <div className="w-1/4 border border-gray-300 rounded-md p-2">
            <SidebarHostAccount activePage={active} />
          </div>
          <div className="w-full border border-gray-300 rounded-md p-2">
            {active === 'personal' && <PersonalInfo />}
            {active === 'bookings' && <BookingsHotelSide />}
            {active === 'earnings' && <HostEarnings />}
            {active === 'security' && <UserSecurity />}
          </div>
        </div>

      </main>
      <Footer/>
    </div>
  )
}

export default HostProfilePage
