import React from 'react'

function Home() {
    return (
        <div className='text-center mt-10 bg-[#f1e7dd]'>
            <h1 className='text-3xl font-bold'>Welcome to Crafted by Chosen</h1>
            <p className='mt-2 font-semibold'>Your all time crochet fashion store.</p>

            <div className="border-4 border-orange-400 rounded-lg m-8 p-4 grid grid-cols-3 gap-4">
                <img src="" alt="Sweaters" className='rounded-lg shadow h-50 w-full' />
                <img src="/images/crochethandbags.jpeg" alt="Bags" className="rounded-lg shadow h-50 w-full" />
                <img src="/images/home-decor3.jpeg" alt="Decor" className="rounded-lg shadow h-50 w-full" />
                <img src="/images/Crocheted dress.jpg" alt="Knitted dress" className="rounded-lg shadow h-50 w-full" />


            </div>
        </div >
    )
}

export default Home