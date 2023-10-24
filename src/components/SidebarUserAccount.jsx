import React from 'react'
import { sidebarMenuItems } from './userAccountSidebar';
import SidebarItems from './userAccountSidebar/SidebarItems';

const SidebarUserAccount = ({ activePage }) => {
  
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      {sidebarMenuItems.map((item, index) => (
        <SidebarItems
          key={index}
          active={activePage === item.route}
          link={item.link}
          icon={item.icon}
          text={item.text}
          activeClass="bg-gray-300 rounded-md"
          inActiveClass="hover:bg-gray-300 hover:rounded-md"
        />
      ))}
    </div>
  )
}

export default SidebarUserAccount
