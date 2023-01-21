import React from 'react'
import Typewriter from 'typewriter-effect';

export default function Banner() {

  return (

    <div className={` bg-[url('/banner.svg')] lg:bg-cover  bg-contain bg-no-repeat h-[30rem] `}>
      <div className={`md:w-[28rem] w-[21rem] sm:justify-center   pl-8 pt-8 md:pl-16  lg:pl-28 md:pt-20 flex justify-start  flex-col `}>
        <h1 className=' md:text-3xl sm:text-2xl text-xl font-bold font-serif   '>
          Welcome to <span className='block  md:text-4xl sm:text-3xl text-2xl text-pink-800 lg:text-5xl '>CHOISEWEAR</span>
          <div className='border-solid border-b-2 border-x-lime-900 md:w-72 sm:w-60  w-40'></div>
        </h1>
        <p className='text-sm font-serif sm:pt-6 md:text-2xl sm:w-full w-52'>
        Here you can buy best designed or quaility - 
        <Typewriter
  options={{
    strings: ['T-shirts', 'Hoodies','Mugs','Stickers'],
    autoStart: true,
    loop: true,
  }}
/> </p>
      </div>
       
    
      </div>
  )
}
