import { Boxes, CircleUser, LayoutDashboard, Package, SquarePen, Users } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [active, setActive] = useState('dashboard');

  return (
    <div>
      <div className='absolute md:relative flex flex-col gap-3 w-[250px] border-b border-r border-gray-300 h-screen pt-3 transition-all bg-white'>
        <NavLink to='/admin' onClick={() => setActive('dashboard')} className={active === 'dashboard' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <LayoutDashboard />
            <span>Dashboard</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
        <NavLink to='addproducts' onClick={() => setActive('addproducts')} className={active === 'addproducts' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <SquarePen />
            <span>Add products</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
        <NavLink to='products' onClick={() => setActive('products')} className={active === 'products' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <Boxes />
            <span>Products</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
        <NavLink to='orders' onClick={() => setActive('orders')} className={active === 'orders' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <Package />
            <span>Orders</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
        <NavLink to='userspage' onClick={() => setActive('users')} className={active === 'users' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <Users />
            <span>Users</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
        <NavLink to='adminpage' onClick={() => setActive('admin')} className={active === 'admin' ? "h-12 flex bg-indigo-100 justify-between transition-all" : "h-12"}>
          <p className='text-xl text-gray-700 flex gap-2 items-center ml-3'>
            <CircleUser />
            <span>Admin</span>
          </p>
          <span className='bg-indigo-500 h-full w-2'></span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar