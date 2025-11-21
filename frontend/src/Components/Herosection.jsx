import { ArrowRight } from 'lucide-react'
import React from 'react'
import { mobileassets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Herosection = () => {
    const navigate = useNavigate();
  return (
    <div>
       <div className='flex flex-wrap md:items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 transition-all md:pt-30 w-full'>
         <div className="left-content w-[100%] md:w-[50%]">
            <div onClick={() => navigate('/shop')} className='animate-bounce hover:animate-none cursor-pointer text-sm w-[100%] xl:w-[60%] border border-indigo-500 rounded-full px-3 py-2 flex items-center justify-between'>
                <p className='text-indigo-500'>Enjoy 20% off your first purchase</p>
                <span className='bg-indigo-500 rounded-full'><ArrowRight className='text-white'/></span>
            </div>
            <p className='text-5xl md:text-6xl font-medium text-gray-800 mt-5'>fashion crafted for those <span className='text-indigo-500'>who demand</span> the finest.</p>
            <p className='text-gray-500 text-xl'>Elevate your fashion journey with exclusive designs crafted for refined expression.</p>
            
            <div onClick={() => navigate('/shop')} className='bg-indigo-500 flex w-[100%] xl:w-[30%] px-3 py-3 rounded-full justify-between items-center mt-5 hover:scale-105 cursor-pointer'>
                <button className='text-xl font-medium text-white cursor-pointer'>Shop Now</button>
                <span className='bg-white rounded-full'><ArrowRight className='text-indigo-500'/></span>
            </div>
        </div>
        <div className="right-content w-[100%] md:w-[50%] flex flex-wrap items-center justify-between mt-10 md:mt-0">
            {
                mobileassets.map((items , index) => (
                    <div key={index} className='w-[48%] h-[200px] md:h-[250px] mt-2 md:mt-5 overflow-hidden rounded-lg overflow-hidden'>
                        <img src={items.img} loading='lazy' alt="" className='w-full h-full hover:scale-105 transition duration-300'/>
                    </div>
                ))
            }
        </div>
       </div>
    </div>
  )
}

export default Herosection