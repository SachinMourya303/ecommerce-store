import { ChartNoAxesCombined, Funnel, Shirt } from 'lucide-react'
import React from 'react'

const Featuresection = () => {
    return (
        <div>
            <div className='flex justify-center w-full mt-10 md:mt-30 px-6 md:px-16 lg:px-24 xl:px-32 py-4 transition-all'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]/70"></div>
                    <div className="flex flex-col items-center justify-center max-w-80">
                        <div className="p-6 aspect-square bg-indigo-100 rounded-full">
                            <Shirt className='text-indigo-800' />
                        </div>
                        <div className="mt-5 space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">Wide Product Range</h3>
                            <p className="text-sm text-slate-600">Variety of clothing, footwear, and accessories for men, women, and kids.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center max-w-80">
                        <div className="p-6 aspect-square bg-indigo-100 rounded-full">
                            <Funnel className='text-indigo-800' />
                        </div>
                        <div className="mt-5 space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">Personalized Shopping Experience</h3>
                            <p className="text-sm text-slate-600">Style recommendations, filters, and size guides , with best products</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center max-w-80">
                        <div className="p-6 aspect-square bg-indigo-100 rounded-full">
                            <ChartNoAxesCombined className='text-indigo-800' />
                        </div>
                        <div className="mt-5 space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">Seasonal Collections & Trends</h3>
                            <p className="text-sm text-slate-600">Regular updates with the latest fashion trends and new arrivals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featuresection