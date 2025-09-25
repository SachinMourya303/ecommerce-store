import axios from 'axios';
import { Funnel, ListFilter, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { logo } from '../../assets/assets';

const Orders = () => {
  const [filterValue, setfilterValue] = useState("");
  console.log(filterValue);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/myorder/getmyorderproducts?orderstatus=${filterValue}`);
      setProducts(response.data.products);
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [filterValue]);

  const onFilterChange = (e) => {
    setfilterValue(e.target.value);
  };

  const [updateModel, setUpdateModel] = useState(false);
  const [productId, setProductId] = useState();
  const [productImg, setProductImg] = useState(false);
  const [productData, setProductData] = useState({
    orderstatus: ""
  })

  const onChnageHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData(form => ({ ...form, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/myorder/updateorderstatus?id=${productId}`,
        { orderstatus: productData.orderstatus },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message);
      setUpdateModel(false);
      setProductData({ orderstatus: "" });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const removeProducts = async (mongoid) => {
    try {
      const response = await axios.delete('http://localhost:5000/myorder/deleteproduct', {
        params: {
          id: mongoid
        }
      })
      fetchProducts();
      toast.success(response.data.message);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Toaster />
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">Orders</h2>
          <div className='flex gap-2 m-4 justify-end w-full'>
            <div className='border border-gray-300 p-2 flex rounded-lg mx-4'>
              <span className='text-gray-600'><ListFilter /></span>
              <select onChange={onFilterChange} value={filterValue} name='filter' className='text-gray-600 outline-none cursor-pointer'>
                <option value="">All orders</option>
                <option value="order placed">order placed</option>
                <option value="order packed">order packed</option>
                <option value="order arrived">order arrived</option>
                <option value="order delivered">order delivered</option>
              </select>
            </div>
          </div>
          <div className="h-[70vh] overflow-scroll flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Product</th>
                  <th className="px-4 py-3 font-semibold truncate hidden md:block">Category</th>
                  <th className="px-4 py-4 font-semibold truncate">Status</th>
                  <th className="px-4 py-3 font-semibold truncate">Edit</th>
                  <th className=" py-4 py-3 font-semibold truncate">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img src={`http://localhost:5000/productImg/${product.filename}`} alt="Product" className="w-16 h-16" />
                      </div>
                      <div className="flex flex-col">
                        <span className="truncate max-sm:hidden w-full">{product.title}</span>
                        <span className="truncate max-sm:hidden w-full">{product.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3 truncate">{product.orderstatus}</td>
                    <td onClick={() => { setUpdateModel(true); setProductId(product._id); }} className="px-4 py-3  cursor-pointer "><Pencil /></td>
                    <td onClick={() => removeProducts(product._id)} className=" px-4 py-3 cursor-pointer text-red-500"><X /></td>

                    {
                      updateModel ?
                        <div className='backdrop-blur w-full h-screen absolute top-0 left-0 flex justify-center mt-15 pt-50'>
                          <div className='w-[90%] md:w-[40%] h-[30vh] p-5 border border-gray-400 rounded-lg bg-white/80'>
                            <span onClick={() => setUpdateModel(false)} className='w-full flex justify-end cursor-pointer'> <X /> </span>
                            <form onSubmit={onSubmitHandler} className="space-y-5 w-[80vw] md:w-[60vw]">
                              <div className="w-full flex flex-col gap-1">
                                <label className="text-base font-medium mb-2" htmlFor="category">Order status</label>
                                <select onChange={onChnageHandler} name='orderstatus' value={productData.orderstatus} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full md:w-[60%]" required>
                                  <option value="">Select Status</option>
                                  <option value="order placed">order placed</option>
                                  <option value="order packed">order packed</option>
                                  <option value="order arrived">order arrived</option>
                                  <option value="order delivered">order delivered</option>
                                </select>
                              </div>
                              <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">Update</button>
                            </form>
                          </div>
                        </div> : ""
                    }
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

export default Orders