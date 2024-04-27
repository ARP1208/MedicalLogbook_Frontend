import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-300 overflow-hidden navbar-expand bg-grey w-100 h-11'>
      <ul className="navbar-nav list-none gap-10 justify-center flex ml-auto text-8">

        {/* Registration Navbar */}
        <nav className="text-lg font-semibold">
          <NavLink
            to="/HODhomePage"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500 p-3 no-underline"
                : "text-black no-underline"
            }
          > Registration </NavLink>
        </nav>

        {/* Announcement Navbar */}
        <nav className="text-lg font-semibold ">
          <NavLink
            to="/DepartmentalAnnHome"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          > Announcements </NavLink>
        </nav>

        {/* Gradesheet Navbar */}
        <nav className="text-lg font-semibold ">
          <NavLink
            to="/ProfileHome"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          > Profile </NavLink>
        </nav>
        <nav className="text-lg font-semibold ">
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          > Dashboard </NavLink>
        </nav>
      </ul>
    </div>
  )
}

export default Navbar