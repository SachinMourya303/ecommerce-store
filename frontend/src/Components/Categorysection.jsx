import React from 'react'
import { fullmodel } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categorysection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex px-6 md:px-16 lg:px-24 xl:px-32 py-4 relative transition-all mt-10 justify-between flex-wrap'>
        {
          fullmodel.map((item) => (
            <div key={item.id} className='w-[48%] md:w-[24%] h-500px flex flex-col items-center hover:mt-[-5px] transition duration-300'>
                <img onClick={() => navigate(`/categories/${item.category}`)} src={item.img} alt="" className='h-full w-full transition duration-300 ease-in-out cursor-pointer'/>
              <p className='text-xl font-medium text-gray-800'>{item.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Categorysection