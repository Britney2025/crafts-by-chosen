import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AddProduct from './pages/Addproduct'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Products from './pages/Products'

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-products' element={<AddProduct />} />
          <Route path='/products' element={<Products />} />
        </Routes>
    </Router>
  )
}

export default App