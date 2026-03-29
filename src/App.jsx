import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Applications from './pages/Applications'

const App = () => {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/applyjob/:id' element={<Applyjob/>}/>
      <Route path='/applications' element={<Applications/>}/>
     </Routes>
    </>
  )
}

export default App