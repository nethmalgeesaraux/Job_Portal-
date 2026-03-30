import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobList from '../components/JobList'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <JobList/>
    </div>
  )
}

export default Home