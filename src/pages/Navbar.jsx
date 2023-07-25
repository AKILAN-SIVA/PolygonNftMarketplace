function Navbar() {

    return (
        <>
            <div className='bg-black flex justify-between items-center w-full h-20 text-white px-16'>
                <h1 className='text-xl font-bold'>Nft Marketplace</h1>
                <div className="flex justify-start gap-8">
                    <h1 className='text-xl font-bold'>Create</h1>
                    <h1 className='text-xl font-bold'>Profile</h1>
                </div>
            </div>
        </>
    )
}

export default Navbar
