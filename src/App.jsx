import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AddProduct from './pages/Addproduct'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-products' element={<AddProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/wishlist'
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App