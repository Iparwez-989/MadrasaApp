import { BookOpenTextIcon, HouseSimpleIcon, ListHeartIcon, MosqueIcon } from '@phosphor-icons/react'
import React from 'react'

const BottomNav = () => {
  return (
    <div className='bg-slate-200  h-16 flex justify-around items-center text-gray-600 p-3'>
      <div>
        <HouseSimpleIcon size={30} />
        <p>Home</p>
      </div>
      <div>
        <BookOpenTextIcon size={30} />
        <p>Quran</p>
        </div>
        <div className='bg-[#6d2dd3] rounded-full p-3 text-black'>
            <ListHeartIcon size={30} />
        </div>
      <div>
        <MosqueIcon size={30} />
        <p>Maktab</p>
        </div>
      <div>
        <ListHeartIcon size={30} />
        <p>Dua</p>
        </div>
      
      
      
    </div>
  )
}

export default BottomNav
