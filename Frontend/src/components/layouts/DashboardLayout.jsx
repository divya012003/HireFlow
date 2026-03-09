import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen flex bg-gray-100'>
      <div className='w-64 bg-white shadow-md p-5'>
        <h2 className='text-2xl font-bold text-green-600 mb-8'>HireFlow</h2>
        <nav className='space-y-4' >
          <Link to="/dashboard"  ><p className='cursor-pointer hover:text-blue-600'>Dashboard</p></Link>
          <Link to="/jobs"><p className='cursor-pointer hover:text-blue-600'>Jobs</p></Link>
          <Link to="/profile"><p className='cursor-pointer hover:text-blue-600'>Profile</p></Link>

        </nav>
      </div>

      <div className='flex-1 p-8'>
        <Outlet />
      </div>

    </div>
  )
}

export default DashboardLayout
