import React from 'react'
import Navbar from "../pages/Navbar"
import Card from '../components/Card'

export const Explore = () => {
    return (
        <div className='bg-black h-screen w-full text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='flex flex-wrap justify-center gap-4 pt-20'>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
            </div>
        </div>
    )
}
