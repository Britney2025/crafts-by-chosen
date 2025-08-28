import React from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import { Link } from 'react-router'

function Navbar() {
    return (

        <header className="flex justify-between items-center px-8 py-4 bg-[#fdf6f0] border-b border-gray-300">
            <div className='text-4xl text-orange-800 font-bold'>
                Crafts By Chosen
            </div>
            <nav className="flex gap-6 text-lg text-orange-800 font-semibold">
                <Link to="/" className='hover:text-orange-600'>Home</Link>
                <Link to="/products" className='hover:text-orange-600'>Products</Link>
                <Link to="/wishlist" className='hover:text-orange-600 flex items-center gap-1'>
                    Wishlist
                    <FaHeart />
                </Link>
                <Link to="/cart" className='hover:text-orange-600 flex items-center gap-1'>
                    Cart
                    <FaShoppingCart />
                </Link>
                <Link to="/auth" className='hover:text-orange-600'>Login/Signup</Link>
                <Link to="/orders" className='hover:text-orange-600 flex items-center gap-1'>
                    <VscAccount />
                    My Account
                </Link>
                <Link to="/add-products" className='hover:text-orange-600'>Admin</Link>
            </nav>
        </header>


    )
}

export default Navbar