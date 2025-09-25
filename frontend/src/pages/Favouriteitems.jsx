import axios from 'axios';
import { ChevronRight, ShoppingBag, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Components/Footer';

const FavouriteItems = ({ user, setCartProducts, fetchedFavProducts, fetchFavProducts, setfetchedCartProducts }) => {

  const naviagte = useNavigate();

  //  cart products post

  const onCartSubmit = async (items) => {
    try {
      const cartData = {
        email: user.email,
        title: items.title,
        description: items.description,
        category: items.category,
        price: items.price,
        filename: items.filename,
      }
      setCartProducts(cartData);
      const response = await axios.post('http://localhost:5000/cartproducts/allcartproducts', cartData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setfetchedCartProducts((prev) => [...prev, response.data.products]);
      toast.success(response.data.message);
    }
    catch (error) {
      if (!user) {
        toast.error('Signin First');
      }
      else {
        toast.error(error.message);
      }
    }
  }

  const removeProducts = async (mongoid) => {
    try {
      const response = await axios.delete('http://localhost:5000/favproducts/deleteproduct', {
        params: {
          id: mongoid
        }
      })
      fetchFavProducts();
      toast.success(response.data.message);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Toaster />
      <div className='flex flex-col items-center w-full md:pt-20 transition-all'>
        <div className='bg-indigo-100 w-full p-1 flex justify-center border border-indigo-200'>
          <p className='text-indigo-400 text-xs'>If product details are not seen refresh once </p>
        </div>
        <div className='flex my-5 md:mt-10 text-gray-700 w-full justify-start px-6 md:px-16 lg:px-24 xl:px-32'><NavLink to='/'>Home</NavLink> <ChevronRight /> <NavLink to='/favourite'>Favourite</NavLink> </div>
      </div>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className='flex flex-wrap px-6 md:px-16 lg:px-24 xl:px-32 gap-2 lg:gap-[5] xl:gap-10'>
            {
              fetchedFavProducts.map((items) => (
                <figure key={items?._id} className='border border-gray-300 mb-5 w-[145px] lg:w-[200px] xl:w-[250px] rounded-lg overflow-hidden relative'>
                  <img onClick={() => naviagte(`/productdetails/${items?._id}`)} src={`http://localhost:5000/productImg/${items?.filename}`} alt="" className='h-[145px] lg:h-[200px] xl:h-[250px] w-[100%] border-b border-gray-300 hover:scale-105 transition duration-300' />
                  <span onClick={() => removeProducts(items?._id)} className='absolute top-3 right-4 z-10 hover:text-red-500 cursor-pointer text-gray-700'>
                    <X />
                  </span>
                  <div className='p-2'>
                    <figcaption className='text-gray-800'>{items?.title.slice(0, 25)}</figcaption>
                    <figcaption className='text-sm text-gray-500'>{items?.description.slice(0, 50)}</figcaption>
                    <figcaption className='flex items-center justify-between'>
                      <span>₹ {items?.price}</span>
                      <button onClick={() => onCartSubmit(items)} className='p-2 bg-indigo-200 rounded-lg hover:bg-indigo-300 cursor-pointer'><ShoppingBag /></button>
                    </figcaption>
                  </div>
                </figure>
              ))
            }
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default FavouriteItems