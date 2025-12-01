import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import TaskForm from './pages/TaskForm.jsx'
import TaskList from './pages/TaskList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>{<TaskList />}</h1>}/>
        <Route path="/add" element={<TaskForm />}/>
        <Route path="/edit/:id" element={<TaskForm />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
