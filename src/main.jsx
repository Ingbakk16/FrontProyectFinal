import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './components/login/login.jsx'
import Register from './components/register/register'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login/>
  </React.StrictMode>,
)
