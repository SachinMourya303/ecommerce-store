import React, { useEffect, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, Strikethrough, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const Navbar = ({ user, setUser, fetchedCartProducts, fetchedFavProducts, setCartProducts, setFavProducts , setfetchedFavProducts , setfetchedCartProducts }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState(false);

    const [searchedProducts, setSearchedProducts] = useState([]);

    const [searchText, setSearchText] = useState({
        search: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchText(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (searchText.search.trim() !== "") {
                    const response = await axios.get(
                        `http://localhost:5000/products/getallproducts?category=${searchText.search}`
                    );
                    setSearchedProducts(response.data.products);
                } else {
                    setSearchedProducts([]);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchProducts();
    }, [searchText.search]);

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


    return (
        <div className='md:absolute w-full'>
            <Toaster />
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
                <div className='flex items-center gap-2 text-indigo-500'>
                    <Strikethrough />
                    <span className='text-2xl'>Zyora</span>
                </div>

                <div className="flex items-center md:gap-8">
                    <div className='hidden md:flex items-center gap-8'>
                        <NavLink to="/" href="#">Home</NavLink>
                        <NavLink to="/shop" href="#">Shop</NavLink>
                        <NavLink to="/myorders">Myorders</NavLink>
                    </div>

                    <div className="flex items-center text-sm px-3 rounded-full gap-3 md:gap-8">

                        <div onClick={() => setModel(true)} className="relative cursor-pointer">
                            <Search />
                        </div>

                        <NavLink to='/favourite'>
                            <div className="relative cursor-pointer">
                                <Heart />
                                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{fetchedFavProducts.length}</button>
                            </div>
                        </NavLink>

                        <NavLink to='/cart'>
                            <div className="relative cursor-pointer">
                                <ShoppingBag />
                                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{fetchedCartProducts.length}</button>
                            </div>
                        </NavLink>

                        <NavLink to='/admin' className='border border-gray-300 px-3 py-2 rounded-full text-gray-500 hidden md:flex'>Admin!</NavLink>

                        {
                            user
                                ? <button onClick={() => setUser(localStorage.removeItem('user'))} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full cursor-pointer hover:scale-105 hidden md:flex">
                                    Logout
                                </button>
                                : <NavLink to='/login'>
                                    <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full cursor-pointer hover:scale-105 hidden md:flex">
                                        Signin
                                    </button>
                                </NavLink>
                        }
                    </div>

                    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="md:hidden">
                        {/* Menu Icon SVG */}
                        {
                            open ? <X /> : <Menu />
                        }
                    </button>
                </div>

                <div className={`${open ? 'flex' : 'hidden'} absolute z-100 top-[70px] right-0 pl-5 w-[60%] h-screen bg-white shadow-md py-4 flex-col items-center gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/" className="border-b border-gray-300 text-gray-700 mt-5 w-full pb-2 text-center">Home</NavLink>
                    <NavLink to="/shop" className="border-b border-gray-300 text-gray-700 mt-5 w-full pb-2 text-center">Shop</NavLink>
                    <NavLink to="/myorders" className="border-b border-gray-300 text-gray-700 mt-5 w-full pb-2 text-center">Myorders</NavLink>
                    <NavLink to='/admin' className='px-3 py-2 rounded-full text-gray-700 text-center'>Admin!</NavLink>
                    <div className='mt-20'>
                        {
                            user
                                ? <button onClick={() => setUser(localStorage.removeItem('user'))} className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-md cursor-pointer hover:scale-105">
                                    Logout
                                </button>
                                : <NavLink to='/form'>
                                    <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-md cursor-pointer hover:scale-105">
                                        Signin
                                    </button>
                                </NavLink>
                        }
                    </div>
                </div>

            </nav>

            {
                model
                    ? <div className='absolute z-100 w-full h-screen backdrop-blur flex justify-center py-10 transition-all'>
                        <div className='bg-white w-[90%] md:w-[50%] border border-gray-300 rounded-lg shadow-[0px_0px_10px_lightgray] overflow-y-scroll'>
                            <div className='flex justify-around mt-5'>
                                <div className='w-[80%] border border-gray-300 flex justify-center items-center h-12 px-5 rounded-full'>
                                    <input onChange={onChangeHandler} name='search' value={searchText.search} type="text" placeholder='Search menshirt , womentop , shooes , sunglasses' className='w-[90%] outline-none' />
                                </div>
                                <button onClick={() => setModel(false)} className='text-gray-500 cursor-pointer'><X /></button>
                            </div>
                            <hr className='border-1 border-gray-300 mt-5' />

                            <div className='flex flex-wrap px-6 md:px-10 lg:px-15 xl:px-20 gap-2 mt-5'>
                                {
                                    searchedProducts.map((items) => (
                                        <figure key={items._id} className='border border-gray-300 mb-5 w-[125px] lg:w-[200px] xl:w-[250px] rounded-lg overflow-hidden relative'>
                                            <img onClick={() => { navigate(`/productdetails/${items._id}`); setModel(false); }} src={`http://localhost:5000/productImg/${items.filename}`} alt="" className='h-[125px] lg:h-[200px] xl:h-[250px] w-[100%] border-b border-gray-300 hover:scale-105 transition duration-300' />
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
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}

export default Navbar