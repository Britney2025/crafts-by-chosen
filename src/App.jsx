import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AddProduct from './pages/Addproduct'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AuthPage from './pages/AuthPage'
import Orders from './pages/Orders'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-products' element={<AddProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/wishlist'
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </Router>
  )
}

export default App