import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import CreateEvent from './components/CreateEvent'
import './event.css'
import './login.css'
import './register.css'
import './dashboard.css'

const App = () => {
  let routes =createBrowserRouter([{
    path:"/",
    element:<Login/>

  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/create-event",
    element:<CreateEvent/>
  }
])
  return <RouterProvider router={routes}/>
    
}

export default App

