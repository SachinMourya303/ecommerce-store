import React, { useState } from 'react'
import { logo } from '../../assets/assets';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Addproducts = () => {
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

            const response = await axios.post('http://localhost:5000/products/allproducts', formData, {
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
    return (
        <div>
            <Toaster />
            <div className="flex flex-col justify-between bg-white">
                <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 w-[100vw] md:w-[70vw]">
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
                    <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">ADD</button>
                </form>
            </div>
        </div>
    )
}

export default Addproducts