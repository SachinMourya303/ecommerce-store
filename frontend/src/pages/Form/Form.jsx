import React, { useState } from 'react'
import { logo } from '../../assets/assets'
import { Lock, Mail, User } from 'lucide-react'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom';

const Form = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState('signin')
    console.log(formValue)
    const [formData, setFormData] = useState({
        name: 'test user',
        email: 'testuser@gmail.com',
        password: 'user123',
    })
    console.log(formData)

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(form => ({ ...form, [name]: value }));
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const sendData = formValue === "signin"
                ? { email: formData.email, password: formData.password }
                : formData;
            const response = await axios.post(`http://localhost:5000/auth/${formValue}`, sendData, {
                headers: {
                    "Content-type": "application/json"
                }
            })
            toast.success(response.data.message);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');

            {/* email form */}

            const webformData = new FormData();
            webformData.append("access_key", "bb770dec-7702-4229-a48f-1fd79d148cb2");
            webformData.append('name' , formData.name);
            webformData.append('email' , formData.email);

            const web3forms = await axios.post('https://api.web3forms.com/submit' , webformData );
            if(web3forms){
                console.log('Form submitted');
            }
            else{
                console.error(error);
            }

            {/* email form */}
        }
        catch (error) {
            toast.error("Login failed")
            console.error(error);
        }
    }
    return (
        <div>
            <Toaster />
            <div className='w-full h-screen flex items-center justify-center'>
                <img src={logo.formImg} alt="" className='w-full h-full' />
                <form onSubmit={onSubmitHandler} className="w-[90%] md:w-[30%] flex flex-col items-center justify-center absolute top-[20%] bg-white/80 p-5 rounded-lg">
                    <h2 className="text-4xl text-gray-900 font-medium">{formValue === 'signin' ? "Sign in" : "Sign up"}</h2>
                    <p className="text-sm text-gray-500 mt-3 mb-10">Welcome back! Please {formValue === 'signin' ? "sign in" : "sign up"} to continue</p>

                    {formValue === 'signup'
                        ? <div className="flex items-center mb-6 w-full bg-transparent border border-indigo-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <User className='text-indigo-500' />
                            <input onChange={onChangeHandler} name='name' value={formData.name} type="text" placeholder="Full name" className="bg-transparent placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                        </div>
                        : ""
                    }

                    <div className="flex items-center w-full bg-transparent border border-indigo-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Mail className='text-indigo-500' />
                        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder="Email id" className="bg-transparent placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-indigo-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Lock className='text-indigo-500' />
                        <input onChange={onChangeHandler} name='password' value={formData.password} type="password" placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input className="h-5" type="checkbox" id="checkbox" />
                            <label className="text-sm" htmlFor="checkbox">Remember me</label>
                        </div>
                    </div>

                    {formValue === "signin"
                        ? <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                            Login
                        </button>
                        : <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                            Sign up
                        </button>
                    }
                    <NavLink to='/' className="mt-8 w-full h-11 rounded-full text-indigo-500 border border-indigo-500 hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer">
                        <button className='cursor-pointer'>Go Back</button>
                    </NavLink>
                    {
                        formValue === "signin"
                            ? <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <span onClick={() => setFormValue('signup')} className="text-indigo-400 hover:underline cursor-pointer">Sign up</span></p>
                            : <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <span onClick={() => setFormValue('signin')} className="text-indigo-400 hover:underline cursor-pointer">Sign in</span></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Form