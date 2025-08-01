// rafce
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const App = () => {
  // JavaScript
  return (
    <>
      <Helmet>
        <title>E-commerce</title>
      </Helmet>
      <ToastContainer />
      <AppRoutes />
    </>
  )
}

export default App
