import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobList from '../components/JobList'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <JobList/>
        <Footer/>
    </div>
  )
}

export default Home