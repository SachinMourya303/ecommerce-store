import axios from 'axios';
import { ArrowLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Components/Footer';

const Cart = ({ user, fetchCartProducts, fetchedCartProducts, setfetchedCartProducts }) => {

  const navigate = useNavigate();

  const removeProducts = async (mongoid) => {
    try {
      const response = await axios.delete('http://localhost:5000/cartproducts/deleteproduct', {
        params: {
          id: mongoid
        }
      })
      fetchCartProducts();
      toast.success(response.data.message);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const totalPrice = (fetchedCartProducts || []).reduce((acc, item) => {
    return acc + Number(item?.price || 0);
  }, 0);


  const [quantity, setQuantity] = useState({});

  const onChange = (e, productId) => {
    const value = e.target.value;
    setQuantity(prev => ({ ...prev, [productId]: value }));
  }

  const totalAmount = fetchedCartProducts.reduce((acc, item) => {
    const qty = quantity[item?._id] || 1;
    return acc + Number(item?.price) * qty
  }, 0)

  const [addressModel, setAddressModel] = useState(false);

  const [addressData, setAddressData] = useState({
    address: "",
    landmark: "",
    phone: "",
    size: "L"
  });
  console.log("Address", addressData);


  const onAddressChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddressData(prev => ({ ...prev, [name]: value }));
  }

  const [myOrderProducts, setmyOrderProducts] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    price: "",
    address: "",
    landmark: "",
    size: "L",
    phone: "",
    orderstatus: "",
    filename: "",
  });
  console.log("Myorder : ", myOrderProducts);
  const onmyOrderSubmit = async (product) => {
    try {
      const myorderData = {
        email: user.email,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        address: addressData.address,
        landmark: addressData.landmark,
        size: addressData.size,
        phone: addressData.phone,
        orderstatus: "order placed",
        filename: product.filename,
      }
      setmyOrderProducts(myorderData);
      const response = await axios.post('http://localhost:5000/myorder/myorderproducts', myorderData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
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

  const handlePayment = async () => {
    if (addressData.size === "") {
      toast.error('Please enter address & size');
    }
    else{
      try {
      const { data: orderData } = await axios.post('http://localhost:5000/payment/create-order', {
        amount: totalAmount,
        currency: 'INR',
      });


      const options = {
        key: "rzp_test_RJsO0UGsFLr9vn",
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Zyora',
        description: 'Purchase Description',
        order_id: orderData.id,

        handler: async function (response) {
          console.log("Payment success:", response);

          for (const product of fetchedCartProducts) {
            await onmyOrderSubmit(product);
          }
          navigate("/myorders");
        },

        prefill: {
          email: user?.email,
          contact: addressData.phone || '',
        },
        theme: {
          color: '#4f46e5',
        },
      };


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message);
    }
    }
  };



  return (
    <div>
      <Toaster />
      <div className='flex flex-col items-center w-full md:pt-20 transition-all'>
        <div className='bg-indigo-100 w-full p-1 flex justify-center border border-indigo-200'>
          <p className='text-indigo-400 text-xs'>If product details are not seen refresh once </p>
        </div>
        <div className='flex my-5 md:mt-10 text-gray-700 w-full justify-start px-6 md:px-16 lg:px-24 xl:px-32'><NavLink to='/'>Home</NavLink> <ChevronRight /> <NavLink to='/cart'>My cart</NavLink> </div>
      </div>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 1, ease: "easeOut" }}>
          {
            fetchedCartProducts ?
              <div className='flex flex-wrap gap-2 lg:gap-[5] xl:gap-10 px-6 md:px-16 lg:px-24 xl:px-32'>
                <div className="flex flex-col md:flex-row max-w-6xl w-full mx-auto">
                  <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                      Shopping Cart <span className="text-sm text-indigo-500">{fetchedCartProducts.length}</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                      <p className="text-left">Product Details</p>
                      <p className="text-center">Subtotal</p>
                      <p className="text-center">Action</p>
                    </div>

                    {fetchedCartProducts.map((product, index) => (
                      <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                          <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                            <img className="max-w-full h-full" src={`http://localhost:5000/productImg/${product?.filename}`} alt={product?.name} />
                          </div>
                          <div>
                            <p className="hidden md:block font-semibold">{product?.name}</p>
                            <div className="font-normal text-gray-500/70">
                              <p><span>{product?.title.slice(0, 20) || "N/A"}</span></p>
                              <div className='flex items-center'>
                                <p>Qty:</p>
                                <select onChange={(e) => onChange(e, product?._id)} value={quantity[product?._id] || 1}>
                                  {
                                    [1, 2, 3, 4, 5].map(num => (
                                      <option key={num} value={num}>{num}</option>
                                    ))
                                  }
                                </select>

                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-center">₹ {product?.price}</p>
                        <button onClick={() => removeProducts(product?._id)} className="cursor-pointer mx-auto text-red-500">
                          <X />
                        </button>
                      </div>)
                    )}

                    <button onClick={() => navigate('/')} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                      <ArrowLeft />
                      Continue Shopping
                    </button>

                  </div>

                  <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                    <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                    <hr className="border-gray-300 my-5" />

                    <div className="mb-6">
                      <p className="text-sm font-medium uppercase">Email</p>
                      <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                      </div>
                      <p className="text-sm font-medium uppercase mt-5">Delivery Address</p>
                      {
                        addressData.address === ""
                          ? <div onClick={() => setAddressModel(true)} className='w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none' rows={4}>Select address</div>
                          : <div className='border border-gray-300 w-full rounded-lg text-sm p-2'>
                            <input value={addressData.address} type="text" className='w-full outline-none' readOnly required />
                            <input value={addressData.landmark} type="text" className='w-full outline-none' readOnly required />
                            <input value={addressData.phone} type="text" className='w-full outline-none' readOnly required />
                            <input value={addressData.size} type="text" className='w-full outline-none' readOnly required />
                          </div>
                      }

                      {
                        addressModel
                          ? <div className='absolute left-0 top-0 w-full h-screen backdrop-blur flex justify-center mt-20'>
                            <div className='w-[90%] md:w-[30%] mt-10'>
                              <div className='bg-indigo-100/50 w-full rounded-lg border border-gray-300 flex flex-col px-5 py-3'>

                                <div className='w-full flex justify-end'>
                                  <button onClick={() => setAddressModel(false)} className='cursor-pointer'><X /></button>
                                </div>
                                <label htmlFor="address">Enter Address</label>
                                <input onChange={onAddressChange} value={addressData.address} name='address' type="text" placeholder='Address' className='border border-gray-500 rounded-lg h-12 px-3 my-3' required />

                                <label htmlFor="landmark">Enter Landmark</label>
                                <input onChange={onAddressChange} value={addressData.landmark} name='landmark' type="text" placeholder='Landmark' className='border border-gray-500 rounded-lg h-12 px-3 my-3' required />

                                <label htmlFor="phone">Phone numbar</label>
                                <input onChange={onAddressChange} value={addressData.phone} name='phone' placeholder='Phone' inputMode='numeric' maxLength={10} className='border border-gray-500 rounded-lg h-12 px-3 my-3' required />

                                <div className='mt-5'>
                                  <label>Select Size</label>
                                  <div className='flex items-center justify-between mt-2'>
                                    <input onChange={onAddressChange} value='S' checked={addressData.size === "S"} name='size' id='s' type="radio" />
                                    <label htmlFor="sm">S</label>
                                    <input onChange={onAddressChange} value='M' checked={addressData.size === "M"} name='size' id='m' type="radio" />
                                    <label htmlFor="m">M</label>
                                    <input onChange={onAddressChange} value='L' checked={addressData.size === "L"} name='size' id='l' type="radio" />
                                    <label htmlFor="l">L</label>
                                    <input onChange={onAddressChange} value='XL' checked={addressData.size === "XL"} name='size' id='xl' type="radio" />
                                    <label htmlFor="xl">XL</label>
                                    <input onChange={onAddressChange} value='XXL' checked={addressData.size === "XXL"} name='size' id='xxl' type="radio" />
                                    <label htmlFor="xxl">XXL</label>
                                  </div>
                                </div>

                                <div className='mt-10 w-full flex justify-between'>
                                  <button className='border border-gray-500 rounded-lg h-12 w-[45%]'>Go Back</button>
                                  <button onClick={() => setAddressModel(false)} className='bg-indigo-500 rounded-lg h-12 w-[45%]'>Continue</button>
                                </div>
                              </div>
                            </div>
                          </div> : ""
                      }

                      <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                      <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="Online">Online Payment</option>
                      </select>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="text-gray-500 mt-4 space-y-2">
                      <p className="flex justify-between">
                        <span>Price</span><span>{totalPrice}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                      </p>

                      <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{totalAmount}</span>
                      </p>
                    </div>

                    <button onClick={handlePayment}
                      className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div> : <h1>No cart found</h1>
          }
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default Cart