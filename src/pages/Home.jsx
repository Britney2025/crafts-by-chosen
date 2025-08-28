import React from 'react'
import { Link } from 'react-router'

function Home() {
    return (
        <div className='text-center mt-10 bg-[#f1e7dd]'>
            <h1 className='text-3xl font-bold'>Welcome to Crafted by Chosen</h1>
            <p className='mt-2 font-semibold'>Your all time crochet fashion store.</p>

            <div className="border-4 border-orange-400 rounded-lg m-8 p-4 grid grid-cols-4 gap-4">
                <img src="/images/Sweaters.jpeg" alt="Sweaters" className='rounded-lg border-[#a4826d] border-6 shadow  h-70 w-full' />
                <img src="/images/crochetslingbags.jpeg" alt="Bags" className="rounded-lg shadow border-[#a4826d] border-6 w-full" />
                <img src="/images/home-decor3.jpeg" alt="Decor" className="rounded-lg shadow border-[#a4826d] border-6 w-full" />
                <img src="/images/Crocheted dress.jpg" alt="Knitted dress" className="rounded-lg shadow border-[#a4826d] border-6 h-70 w-full" />

                <div className='col-span-4 flex flex-col justify-end items-center mt-2 space-y-3'>
                    <p className='text-lg font-semibold text-gray-700 text-center'> Elevate your everyday with crochet pieces made to inspire. We have many products for your everyday charm. Explore unique designs, timeless style, and pieces made with heart💕 !</p>
                    <Link to={"/products"}>
                        <button
                            className='bg-[#a4826d] text-white px-16 py-4 rounded-lg shadow hover:bg-orange-800 transition'
                        >
                            SHOP NOW
                        </button>
                    </Link>

                </div>

            </div>
        </div >
    )
}

export default Home