import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './views/Dashboard.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './components/contexts/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router = { router } />
    </ContextProvider>  
  </React.StrictMode>,
)
