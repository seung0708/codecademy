import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import Products from './pages/Products/Products.jsx'

import 'normalize.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, 
    errorElement: <ErrorPage />
  },
  {
    path: '/products',
    element: <Products />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
