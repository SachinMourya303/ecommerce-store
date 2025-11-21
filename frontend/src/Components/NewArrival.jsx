import axios from 'axios';
import { Heart, ShoppingBag } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewArrival = ({ user, setfetchedFavProducts, setfetchedCartProducts }) => {

  const naviagte = useNavigate();

  // all products
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/products/getallproducts`);
      setProducts(response.data.products);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // favourite products
  const [favProducts, setFavProducts] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    price: "",
    filename: "",
  });

  const onFavSubmit = async (items) => {
    try {
      const favData = {
        email: user.email,
        title: items.title,
        description: items.description,
        category: items.category,
        price: items.price,
        filename: items.filename,
      }
      setFavProducts(favData);
      const response = await axios.post('http://localhost:5000/favproducts/allfavproducts', favData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setfetchedFavProducts((prev) => [...prev, response.data.products]);
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

  //  cart products
  const [cartProducts, setCartProducts] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    price: "",
    filename: "",
  });

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

  return (
    <div>
      <Toaster />
      <div className='flex flex-col items-center w-full my-10'>
        <h1 className='text-gray-800 text-4xl'>New Arrival</h1>
        <p className='text-gray-500'>Explore the latest additions to our collection.</p>
      </div>
      <div className='flex flex-wrap px-6 md:px-16 lg:px-24 xl:px-32 gap-2 lg:gap-[5] xl:gap-10'>
        {
          products.map((items) => (
            <figure key={items._id} className='border border-gray-300 mb-5 w-[145px] lg:w-[200px] xl:w-[250px] rounded-lg overflow-hidden relative'>
              <img onClick={() => naviagte(`/productdetails/${items._id}`)} src={`http://localhost:5000/productImg/${items.filename}`} alt="" className='h-[145px] lg:h-[200px] xl:h-[250px] w-[100%] border-b border-gray-300 hover:scale-105 transition duration-300' />
              <span onClick={(e) => { e.preventDefault(); onFavSubmit(items); }} className='absolute top-3 right-4 z-10 hover:text-red-500 cursor-pointer text-gray-700'>
                <Heart />
              </span>
              <div className='p-2'>
                <figcaption className='text-gray-800'>{items.title.slice(0, 25)}</figcaption>
                <figcaption className='text-sm text-gray-500'>{items.description.slice(0, 50)}</figcaption>
                <figcaption className='flex items-center justify-between'>
                  <span>₹ {items.price}</span>
                  <button onClick={() => onCartSubmit(items)} className='p-2 bg-indigo-200 rounded-lg hover:bg-indigo-300 cursor-pointer'><ShoppingBag /></button>
                </figcaption>
              </div>
            </figure>
          ))
        }
      </div>
    </div>
  )
}

export default NewArrival