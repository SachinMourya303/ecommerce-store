import axios from 'axios';
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Footer from '../Components/Footer';
import toast, { Toaster } from 'react-hot-toast';

const Productdetails = ({ user, setFavProducts, setCartProducts, setfetchedFavProducts, setfetchedCartProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/getallproducts?id=${id}`);
        setProducts(response.data.products);
      }
      catch (error) {
        toast.error(error.message);
      }
    }
    fetchProducts();
  }, [id]);

  const [relatedProduct, setRelatedProducts] = useState([]);
  useEffect(() => {

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/getallproducts?category=${product.category}`);
        setRelatedProducts(response.data.products);
      }
      catch (error) {
        toast.error(error.message);
      }
    }

    fetchRelatedProducts();
  }, [product.category]);

  // fav products

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

  const items = product;

  return product && (
    <div>
      <Toaster />
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 md:pt-20">
        <div className='flex my-5 md:mt-10 text-gray-700 w-full justify-start'><NavLink to='/'>Home</NavLink> <ChevronRight /> <NavLink to='/productdetails'>Productdetails</NavLink> </div>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={`http://localhost:5000/productImg/${product.filename}`} alt="Selected product" className="w-full h-full" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.title}</h1>

            <div className="mt-6">
              <p className="text-2xl font-medium">MRP: ${product.price}</p>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>

            <p className='text-gray-500'>{product.description}</p>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button onClick={() => onCartSubmit(items)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                Add to Cart
              </button>
              <button onClick={() => {onCartSubmit(items); navigate('/cart');}} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-10'>
          {relatedProduct ? <h1 className='text-xl text-gray-700'>Recommended products</h1> : ""}
          <div className='flex flex-wrap gap-2 lg:gap-[5] xl:gap-10 mt-5'>
            {
              relatedProduct ?
                relatedProduct.map((items) => (
                  <figure key={items._id} className='border border-gray-300 mb-5 w-[145px] lg:w-[200px] xl:w-[250px] rounded-lg overflow-hidden relative'>
                    <img onClick={() => navigate(`/productdetails/${items._id}`)} src={`http://localhost:5000/productImg/${items.filename}`} alt="" className='h-[145px] lg:h-[200px] xl:h-[250px] w-[100%] border-b border-gray-300 hover:scale-105 transition duration-300' />
                    <span onClick={() => onFavSubmit(items)} className='absolute top-3 right-4 z-10 hover:text-red-500 cursor-pointer text-gray-700'>
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
                )) : ""
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Productdetails