import React from 'react'

const PrayerCard = ({ icon: Icon, name, time ,active}) => {
  return (
    <div className={`flex flex-col items-center ${active?'text-white font-bold':'text-slate-300' }`}>
      <Icon size={26} />
      <p>{name}</p>
      <p className="text-sm">{time}</p>
    </div>
  )
}

export default PrayerCard

