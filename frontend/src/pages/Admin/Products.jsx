import axios from 'axios';
import { Funnel, ListFilter, Pencil, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { logo } from '../../assets/assets';

const Products = () => {
  const [filterValue, setfilterValue] = useState("");
  console.log(filterValue);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/getallproducts?category=${filterValue}`);
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
  const [productId , setProductId] = useState();
  const [productImg, setProductImg] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: ""
  })

  const onChnageHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData(form => ({ ...form, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('price', productData.price);
      formData.append('productImg', productImg);

      const response = await axios.put(`http://localhost:5000/products/updateproducts?id=${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      toast.success(response.data.message);
      setProductImg(false);
      setProductData({
        title: "",
        description: "",
        category: "",
        price: ""
      })
    }
    catch (error) {
      toast.error('something went wrong');
    }
  }

  const removeProducts = async (mongoid) => {
      try {
        const response = await axios.delete('http://localhost:5000/products/deleteproduct', {
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
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
          <div className='flex gap-2 m-4 justify-end w-full'>
            <div className='border border-gray-300 p-2 flex rounded-lg mx-4'>
              <span className='text-gray-600'><ListFilter /></span>
              <select onChange={onFilterChange} value={filterValue} name='filter' className='text-gray-600 outline-none cursor-pointer'>
                <option value="">All products</option>
                <option value="menshirt">Men</option>
                <option value="womentop">Women</option>
                <option value="shooes">Shooes</option>
                <option value="sunglasses">sunglasses</option>
              </select>
            </div>
          </div>
          <div className="h-[70vh] overflow-scroll flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Product</th>
                  <th className="px-4 py-3 font-semibold truncate">Category</th>
                  <th className="px-4 py-4 font-semibold truncate hidden md:block">Selling Price</th>
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
                      <span className="truncate max-sm:hidden w-full">{product.title}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 max-sm:hidden">₹ {product.price}</td>
                    <td onClick={() => {setUpdateModel(true) ; setProductId(product._id);}} className="px-4 py-3  cursor-pointer "><Pencil /></td>
                    <td onClick={() => removeProducts(product._id)} className=" px-4 py-3 cursor-pointer text-red-500"><X /></td>

                    {
                      updateModel ?
                        <div className='backdrop-blur w-full h-screen absolute top-0 left-0 flex justify-center mt-15 pt-10'>
                          <div className='w-[90%] md:w-[40%] p-5 border border-gray-400 rounded-lg bg-white/80'>
                          <span onClick={() => setUpdateModel(false)} className='w-full flex justify-end cursor-pointer'> <X/> </span>
                            <form onSubmit={onSubmitHandler} className="space-y-5 w-[80vw] md:w-[60vw]">
                              <div>
                                <p className="text-base font-medium mb-2">Product Image</p>
                                <label htmlFor="productImg">
                                  {productImg
                                    ? <img src={URL.createObjectURL(productImg)} className='w-[40%] md:w-[20%] cursor-pointer border border-gray-300 rounded-lg' />
                                    : <img src={logo.upload} alt="" className='w-[40%] md:w-[20%] cursor-pointer' />}
                                </label>
                                <input type="file" onChange={(e) => setProductImg(e.target.files[0])} id='productImg' hidden />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-base font-medium mb-2" htmlFor="product-name">Product Name</label>
                                <input onChange={onChnageHandler} name='title' value={productData.title} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full md:w-[60%]" required />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-base font-medium mb-2" htmlFor="product-description">Product Description</label>
                                <textarea onChange={onChnageHandler} name='description' value={productData.description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none w-full md:w-[60%]" placeholder="Type here" />
                              </div>
                              <div className="w-full flex flex-col gap-1">
                                <label className="text-base font-medium mb-2" htmlFor="category">Category</label>
                                <select onChange={onChnageHandler} name='category' value={productData.category} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full md:w-[60%]" required>
                                  <option value="">Select Category</option>
                                  <option value="menshirt">Men shirt</option>
                                  <option value="womentop">Women top</option>
                                  <option value="watch">Watch</option>
                                  <option value="sunglasses">Sunglasses</option>
                                  <option value="shorts">Shorts</option>
                                  <option value="shooes">Shooes</option>
                                  <option value="menpant">Men pant</option>
                                  <option value="womenpant">Women pant</option>
                                  <option value="mentshirt">Men T-shirt</option>
                                  <option value="womentshirt">Women T-shirt</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-5 flex-wrap">
                                <div className="flex-1 flex flex-col gap-1 w-32">
                                  <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                                  <input onChange={onChnageHandler} name='price' value={productData.price} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-[50%] md:w-[30%]" required />
                                </div>
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

export default Products