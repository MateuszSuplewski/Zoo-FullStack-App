import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Animals from './pages/Animals'
import Animal from './pages/Animal'
import Cart from './pages/Cart'
import Orders from './pages/Orders'

const App = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/'} element={<Home />} />
      <Route path={'/logout'} element={<Logout />} />
      <Route path={'/animals/page/:page'} element={<Animals />} />
      <Route path={'/animal/:animalId'} element={<Animal />} />
      <Route path={'/cart'} element={<Cart />} />
      <Route path={'/orders'} element={<Orders />} />
    </Routes>
  )
}

export default App
