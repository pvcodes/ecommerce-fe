import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from '@/pages/AuthForm';
import ProtectedRoute from '@/lib/ProtectedRoute';
import Products from '@/pages/Products';
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import Navbar from './components/Navbar';
import { Toaster } from './components/ui/sonner';



function App() {

  return (
    <Router>
      <div className='flex flex-col w-full md:w-10/12 justify-center mx-auto mt-2'>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App



// export default LoginForm;