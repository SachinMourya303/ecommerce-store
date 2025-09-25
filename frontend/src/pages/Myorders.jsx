import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Myorders = ({user}) => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/myorder/getmyorderproducts?email=${user.email}`);
      setProducts(response.data.products);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Toaster />
      {
        !products ? <h1 className='w-full flex justify-center pt-50 text-gray-700 text-2xl'>No Orders yet!</h1>
          : <div className='flex flex-col items-center w-full md:pt-15 transition-all'>
            <div className="md:p-10 p-4 space-y-4 px-6 md:px-16 lg:px-24 xl:px-32">
              <div className='flex my-5 md:mt-10 text-gray-700 w-full justify-start'><NavLink to='/'>Home</NavLink> <ChevronRight /> <NavLink to='/myorders'>Myorders</NavLink> </div>
              {products.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[0.5fr_1fr_1fr_1fr] md:items-center gap-5 p-5 rounded-md border border-gray-300 text-gray-800">
                  <div className="flex gap-5">
                    <img src={`http://localhost:5000/productImg/${order.filename}`} alt="" className='h-20 w-20 border border-gray-300 rounded-lg' />
                  </div>

                  <p className="font-medium text-base my-auto text-black/70">{order.title}</p>

                  <div className="text-sm">
                    <p className='font-medium mb-1'>{order.email}</p>
                    <p className='font-medium mb-1'>{order.address} {order.landmark}</p>
                  </div>

                  <div className="flex flex-col text-sm">
                    <p>Date: {order.createdAt.slice(0, 10)}</p>
                    <p>Price: {order.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 
      }
    </div>
  )
}

export default Myorders