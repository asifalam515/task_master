import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from './component/Tasks';
import Navigation from './component/Navbar';
import AddCategory from './component/AddCategory';
import CreateTask from './component/AddTask';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation></Navigation>
      <AddCategory></AddCategory>
      <Tasks></Tasks>
      <CreateTask></CreateTask>
    </>
  )
}

export default App
