import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Herosection from './Components/Herosection'
import Categorysection from './Components/Categorysection';
import Featuresection from './Components/Featuresection';
import Form from './pages/Form/Form';
import Admin from './Components/Admincomponents/Admin';
import Addproducts from './pages/Admin/Addproducts';
import Dashboard from './pages/Admin/Dashboard';
import Orders from './pages/Admin/Orders';
import Userspage from './pages/Admin/Userspage';
import Products from './pages/Admin/Products';
import NewArrival from './Components/NewArrival';
import Productdetails from './pages/Productdetails';
import Shop from './pages/Shop';
import Footer from './Components/Footer';
import FavouriteItems from './pages/Favouriteitems';
import Cart from './pages/Cart';
import axios from 'axios';
import Categories from './pages/Categories';
import Myorders from './pages/Myorders';
import Adminpage from './pages/Admin/Adminpage';

const App = () => {
  const [user, setUser] = useState(false);

  const [fetchedFavProducts, setfetchedFavProducts] = useState([]);
  const [fetchedCartProducts, setfetchedCartProducts] = useState([]);

   const [favProducts, setFavProducts] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    price: "",
    filename: "",
  });

  const [cartProducts, setCartProducts] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    price: "",
    filename: "",
  });

const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cartproducts/getcartproducts?email=${user?.email}`);
      setfetchedCartProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching cart products:", error.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchCartProducts();
    }
  }, [user?.email]);


const fetchFavProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/favproducts/getfavproducts?email=${user?.email}`);
    setfetchedFavProducts(response.data.products);
  } catch (error) {
    console.error("Error fetching fav products:", error.message);
  }
};

useEffect(() => {
  if (user?.email) {
      fetchFavProducts();
    }
}, [user?.email]);



  useEffect(() => {
    const fetchedToken = localStorage.getItem('user');
    setUser(JSON.parse(fetchedToken));
  }, []);

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const fetchedAdminToken = localStorage.getItem('admin');
    setAdmin(JSON.parse(fetchedAdminToken));
  }, []);
  
  const location = useLocation();
  const Homepage = () => {
    return (
      <>
        <Herosection />
        <Featuresection />
        <Categorysection/>
        <NewArrival user={user} setfetchedFavProducts={setfetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts} />
        <Footer />
      </>
    )
  }
  return (
    <div>
      {!location.pathname.startsWith('/admin') && (
        <Navbar user={user} setUser={setUser} fetchedCartProducts={fetchedCartProducts} fetchedFavProducts={fetchedFavProducts} setFavProducts={setFavProducts} setCartProducts={setCartProducts} setfetchedFavProducts={setfetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts}/>
      )}

      <Routes>
        {/* front routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Form user={user} setUser={setUser} />} />

        <Route path='/shop' element={<Shop user={user} setFavProducts={setFavProducts} setCartProducts={setCartProducts} setfetchedFavProducts={setfetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts}/>} />

        <Route path='/favourite' element={<FavouriteItems user={user} fetchFavProducts={fetchFavProducts} setCartProducts={setCartProducts} fetchedFavProducts={fetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts}/>} />

        <Route path='/cart' element={<Cart user={user} fetchCartProducts={fetchCartProducts} fetchedCartProducts={fetchedCartProducts} setfetchedCartProducts={setfetchedCartProducts} />} />

        <Route path='/productdetails/:id' element={<Productdetails user={user} setFavProducts={setFavProducts} setCartProducts={setCartProducts} setfetchedFavProducts={setfetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts}/>} />

        <Route path='/categories/:category' element={<Categories user={user} setFavProducts={setFavProducts} setCartProducts={setCartProducts} setfetchedFavProducts={setfetchedFavProducts} setfetchedCartProducts={setfetchedCartProducts}/>} />

        <Route path='/myorders' element={<Myorders user={user}/>}/>

        {/* backend routes */}
        {location.pathname.startsWith('/admin') && (
          <Route path="/admin" element={<Admin admin={admin} setAdmin={setAdmin} />}>
            <Route index element={<Dashboard />} />
            <Route path="addproducts" element={<Addproducts />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="userspage" element={<Userspage />} />
            <Route path='adminpage' element={<Adminpage/>} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App