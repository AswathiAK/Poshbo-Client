import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItems = ({ active, link, icon, text, activeClass, inActiveClass }) => {
  const itemClass = active ? activeClass : inActiveClass;
  return (
    <Link to={link}>
      <div className={`flex items-center gap-2 p-5 ${itemClass}`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  )
}

export default SidebarItems
