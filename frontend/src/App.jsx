import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import TaskForm from './pages/TaskForm.jsx'
import TaskList from './pages/TaskList'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<ProtectedRoute ><TaskList /></ProtectedRoute>}/>
        <Route path="/add" element={<ProtectedRoute ><TaskForm /></ProtectedRoute>}/>
        <Route path="/edit/:id" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        
      </Route>
    </Routes>
    </>
  )
}


export default App
