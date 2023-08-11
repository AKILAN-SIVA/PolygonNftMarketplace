import React from 'react'
import Navbar from "../pages/Navbar"

export const Home = () => {
  return (
    <div className='bg-black h-screen text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <h1>Home page</h1>
    </div>
  )
}
