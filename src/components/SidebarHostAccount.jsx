import React from 'react'
import SidebarItems from './userAccountSidebar/SidebarItems';
import { sidebarHostItems } from './userAccountSidebar';

const SidebarHostAccount = ({activePage}) => {
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      {sidebarHostItems.map((item, index) => (
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

export default SidebarHostAccount
