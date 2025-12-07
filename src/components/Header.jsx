import React, { useEffect, useState } from 'react'
import Madrasa from '../assets/Madrasa.svg'
import useLocationStore from '../store/useLocationStore';
import { MapPinIcon } from '@phosphor-icons/react';


const Header = () => {
    const city = useLocationStore((state) => state.city);
    const country = useLocationStore((state) => state.country);
    const fetchLocation = useLocationStore((state) => state.fetchLocation);
    const loading = useLocationStore((state) => state.loading);
    const[loc,setLoc] = useState('Select location')
    useEffect(() => {
        fetchLocation();
    },[]);  
    
    const handleUpdate = ()=>{
      fetchLocation();
    }
    useEffect(() => {
    if (city && country) {
      setLoc("Your location");
    }
  }, [city, country]);

  return (
    <div className='px-2 py-3 bg-slate-100'>  
        <div className='flex items-center justify-between'>
            <img className='' src={Madrasa} alt="" />
            <div onClick={handleUpdate} className='text-right text-sm font-serif text-violet-700'>
              <h1 className='font-semibold '>{loc}</h1>
              <p className=" flex items-center gap-1 ">
                <MapPinIcon weight='fill' size={16} />
                {loading
                  ? "Fetching location..."
                  : city && country
                    ? `${city}, ${country}`
                    : "Unable to fetch"}
              </p>
            </div>
        </div>
    </div>
  )
}

export default Header
