import { BookOpenTextIcon, HouseSimpleIcon, ListHeartIcon, MosqueIcon } from '@phosphor-icons/react'
import React from 'react'

const BottomNav = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full text-sm font-semibold bg-slate-200  h-16 flex justify-around items-center text-gray-600 p-4'>
      <div className='flex flex-col items-center '>
        <HouseSimpleIcon size={28} />
        <p>Home</p>
      </div>
      <div className='flex flex-col items-center '>
        <BookOpenTextIcon size={28} />
        <p className=''>Quran</p>
        </div>
        <div className='bg-[#6d2dd3] rounded-full p-3 text-black '>
            <ListHeartIcon size={28} />
        </div>
      <div className='flex flex-col items-center '>
        <MosqueIcon size={28} />
        <p>Maktab</p>
        </div>
      <div className='flex flex-col items-center '>
        <ListHeartIcon size={28} />
        <p>Dua</p>
        </div>
      
      
      
    </div>
  )
}

export default BottomNav
