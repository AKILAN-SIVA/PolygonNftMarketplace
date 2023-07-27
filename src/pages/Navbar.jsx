import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {

    let [open, setOpen] = useState(true);

    return (
        <>
            <div className='bg-stone-500 md:flex md:flex-row justify-between items-center w-full h-20 text-white py-4 md:px-16 z-50'>
                <div className="flex justify-between md:justify-start px-8 items-center md:gap-12">
                    <h1 className='text-lg md:text-xl font-bold'>Nft Marketplace</h1>
                    <input type="text" placeholder="search" className="rounded-full w-40 md:w-[500px] h-10 text-black px-6 border-2 border-black focus:outline-none bg-transaprent"></input>
                    <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer"><FaBars /></div>
                </div>
                <div className={`absolute md:static md:z-auto z-[-1] transition-all duration-500 ease-in md:flex flex-col md:flex-row w-full h-96 md:h-20 md:w-[300px] bg-stone-500 ${open ? 'top-20' : 'mt-[-490px]'}`}>
                    <ul className={`mt-2 md:mt-0 md:px-0 md:py-0 md:text-white px-6 py-12 grid justify-center md:items-center gap-10 md:text-xl text-2xl font-bold text-black md:flex `}>
                        <li>Create</li>
                        <li>Explore</li>
                        <li>Profile</li>
                    </ul>
                    {/* <h1 >Create</h1>
                    <h1 className='text-xl font-bold'>Profile</h1> */}
                </div>
            </div>
        </>
    )
}

export default Navbar
