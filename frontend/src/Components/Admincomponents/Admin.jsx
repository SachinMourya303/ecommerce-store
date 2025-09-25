import React, { useState } from 'react'
import Adminnavbar from './Adminnavbar'
import Sidebar from './Sidebar'
import AdminForm from "../../pages/Form/AdminForm";
import { Outlet } from 'react-router-dom'

const Admin = ({ admin, setAdmin }) => {
  const [sideBar , setSideBar] = useState(false);
  return (
    <div>
      {
        admin
          ? <div>
            <Adminnavbar admin={admin} setAdmin={setAdmin} sideBar={sideBar} setSideBar={setSideBar}/>
           <div className='flex'>
             <div className='hidden md:flex'><Sidebar/></div>
             <div className='flex md:hidden'>{ sideBar ? <Sidebar/> : ""}</div>
            <Outlet/>
           </div>
          </div>
          : <AdminForm admin={admin} setAdmin={setAdmin}/>
      }
    </div>
  )
}

export default Admin