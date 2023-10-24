import React from 'react'
import { useParams } from 'react-router-dom';
import { BookedDetails, MyReviews, PersonalInfo, SidebarUserAccount, UserSecurity, UserWallet } from '../components';

const UserProfilePage = () => {
  const { active } = useParams();

  return (
    <div>
      <main className="h-auto sm:min-h-screen px-4 md:px-20">
        <div className="my-8 flex items-start gap-5">
          <div className="w-1/4 border border-gray-300 rounded-md p-2">
            <SidebarUserAccount activePage={active} />
          </div>
          <div className="w-full border border-gray-300 rounded-md p-2">
            {active === 'personal' && <PersonalInfo />}
            {active === 'bookings' && <BookedDetails />}
            {active === 'wallet' && <UserWallet />}
            {active === 'reviews' && <MyReviews />}
            {active === 'security' && <UserSecurity />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfilePage
