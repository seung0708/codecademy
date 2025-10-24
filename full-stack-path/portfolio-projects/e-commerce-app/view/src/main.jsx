import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import FeaturedProducts from './components/FeaturedProducts.jsx'

import 'normalize.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, 
    errorElement: <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
