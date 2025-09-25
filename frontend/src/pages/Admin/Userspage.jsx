import axios from 'axios';
import { Funnel, ListFilter, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { logo } from '../../assets/assets';

const Userspage = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);

  const [users, setUsers] = useState([]);

  const fetchusers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/allusers?name=${searchValue}`);
      setUsers(response.data.users);
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchusers();
  }, [searchValue]);

  const onFilterChange = (e) => {
    setSearchValue(e.target.value);
  };



  const removeusers = async (mongoid) => {
    try {
      const response = await axios.delete('http://localhost:5000/auth/deleteusers', {
        params: {
          id: mongoid
        }
      })
      fetchusers();
      toast.success(response.data.message);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Toaster />
      <div className="flex-1 flex flex-col justify-between w-full">
        <div className="w-[100vw] md:w-[70vw] md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">Orders</h2>
          <div className='flex gap-2 m-4 w-full'>
            <div className='border border-gray-300 p-2 flex rounded-lg'>
                <input type="text" className='md:w-[80vh] outline-none'  onChange={onFilterChange} value={searchValue} placeholder='Search User' name='filter'/>
            </div>
          </div>
          <div className="h-[70vh] overflow-scroll flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">users</th>
                  <th className="px-4 py-3 font-semibold truncate max-md:hidden">Email</th>
                  <th className="py-3 font-semibold truncate">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {users.map((users, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="flex flex-col">
                        <span className="truncate w-full">{users.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-md:hidden ">{users.email}</td>
                    <td onClick={() => removeusers(users._id)} className=" px-4 py-3 cursor-pointer text-red-500"><X /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userspage;