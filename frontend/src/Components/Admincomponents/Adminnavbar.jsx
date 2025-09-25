import { Menu, Strikethrough, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Adminnavbar = ({ admin, setAdmin , sideBar , setSideBar}) => {
  const navigate = useNavigate();
  const onLogoutSubmit = () => {
    setAdmin(localStorage.removeItem('admin'));
    navigate('/admin');
  }
  return (
    <div>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <div className='flex items-center gap-2 text-indigo-500'>
          <Strikethrough />
          <span className='text-2xl'>Zyora</span>
        </div>
        <div className="flex items-center gap-5 text-gray-500">
          <p className='hidden md:flex'>{admin ? "Hi! Admin" : ""}</p>
          <button onClick={onLogoutSubmit} className='border rounded-full text-sm px-4 py-1 cursor-pointer'>{admin ? "Logout" : "Login first"}</button>

          <div>
            { sideBar 
            ? <div className='flex md:hidden cursor-pointer'><X onClick={() => setSideBar(false)}/></div> 
            : <div className='flex md:hidden cursor-pointer'><Menu onClick={() => setSideBar(true)}/></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminnavbar