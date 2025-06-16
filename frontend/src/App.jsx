import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


// import './App.css'
import Navigations from './components/Navigations.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Academics from './components/Academics.jsx'
import Research from './components/Research.jsx'
import Testimonials from './components/Testimonials.jsx'
import Blog from './components/Blog.jsx'
import Contact from './components/Contact.jsx'
import Gallery from './components/Gallery.jsx'


function App() {
  return (
    <>
    <Navigations></Navigations>
    <Home></Home>
    <About></About>
    <Academics></Academics>
    <Research></Research>
    <Testimonials></Testimonials>
    <Blog></Blog>
    <Gallery></Gallery>
    <Contact></Contact>
    </>


  )
}

export default App
