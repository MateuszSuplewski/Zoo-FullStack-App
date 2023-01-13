import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Logout from './pages/Logout'

const App = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/'} element={<Home />} />
      <Route path={'/logout'} element={<Logout />} />
    </Routes>
  )
}

export default App
