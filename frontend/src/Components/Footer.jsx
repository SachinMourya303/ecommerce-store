import { Strikethrough } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-indigo-50 mt-5 rounded-tr-4xl rounded-tl-4xl">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                    <div className="md:max-w-96">
                        <div className='flex items-center gap-2 text-indigo-500'>
                            <Strikethrough />
                            <span className='text-2xl'>Zyora</span>
                        </div>
                        <p className="mt-6 text-sm">
                            Zyora is a modern fashion destination built to celebrate style, individuality, and confidence. We believe fashion is more than just clothing—it’s a statement of personality and self-expression. At Zyora, we bring together trend-forward designs, timeless classics, and everyday essentials, creating collections that empower people to look and feel their best.
                        </p>
                    </div>
                    <div className="flex-1 flex items-start md:justify-end gap-20">
                        <div>
                            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                            <ul className="text-sm space-y-2 flex flex-col">
                                <NavLink to="/" href="#">Home</NavLink>
                                <NavLink to="/shop" href="#">Shop</NavLink>
                                <NavLink to="/myorders">Myorders</NavLink>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                            <div className="text-sm space-y-2">
                                <p>+91 9359489354</p>
                                <p>zyora@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="pt-4 text-center text-xs md:text-sm pb-5">
                    Copyright 2024 © <NavLink to='/'>Zyora</NavLink>. All Right Reserved.
                </p>
            </footer>
        </div>
    )
}

export default Footer