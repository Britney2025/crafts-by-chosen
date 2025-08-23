import React from 'react'
import { Link } from 'react-router'

function Navbar() {
    return (

        <header className="flex justify-between items-center px-8 py-4 bg-[#fdf6f0] border-b border-gray-300">
            <nav className="flex gap-6 text-lg font-semibold">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/add-products">Admin</Link>
                <Link to="/auth">Auth</Link>
            </nav>
        </header>


    )
}

export default Navbar