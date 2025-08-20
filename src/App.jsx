import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AddProduct from './pages/Addproduct'
import ProductList from './components/ProductList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AddProduct />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/products' element={<ProductList />} />
      </Routes>
    </Router>
  )
}

export default App