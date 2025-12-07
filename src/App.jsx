import './App.css'
import React from 'react'
import Home from './components/Home'
import Header from './components/Header'
import BottomNav from './components/BottomNav'

const App = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen pb-20'>
      <div>
      <Header />
      <Home />
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  )
}

export default App
