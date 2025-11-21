import React from 'react'
import { fullmodel } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categorysection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex px-6 md:px-16 lg:px-24 xl:px-32 py-4 relative mt-10 justify-between flex-wrap'>
        {
          fullmodel.map((item) => (
            <div key={item.id} className='relative group w-[48%] md:w-[24%] h-500px flex flex-col items-center justify-center rounded-lg overflow-hidden cursor-pointer mt-2 md:mt-0'>
                <img onClick={() => navigate(`/categories/${item.category}`)} src={item.img} alt="" className='h-full w-full'/>
              <div className='absolute p-5 h-full w-full text-white opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto flex flex-col items-center justify-center text-center 
               bg-gray-900/30 transition-all duration-700'>
                <p className='text-xl'>{item.title}</p>
                <span className='text-xs'>{item.quote}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Categorysection