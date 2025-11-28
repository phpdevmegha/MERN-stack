import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
     <h1>To Do App</h1>
    </>
  )
}

export default App
