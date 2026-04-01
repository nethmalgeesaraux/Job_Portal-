import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Applications from './pages/Applications'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route
        path='/applyjob/:id'
        element={
          <ProtectedRoute>
            <Applyjob/>
          </ProtectedRoute>
        }
      />
      <Route
        path='/applications'
        element={
          <ProtectedRoute>
            <Applications/>
          </ProtectedRoute>
        }
      />
     </Routes>
    </>
  )
}

export default App
