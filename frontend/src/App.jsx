import { useState, useEffect } from 'react';
import { client } from './client';

import Navigations from './components/Navigations.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Academics from './components/Academics.jsx';
import Experience from './components/Experience.jsx';
import Research from './components/Research.jsx';
import Testimonials from './components/Testimonials.jsx';
import Blog from './components/Blog.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Presence from './components/Presence.jsx';

function App() {
  const [showResearch, setShowResearch] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    // Force to top and stay there
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    client.fetch(`*[_type == "research"][0]`).then(data => setShowResearch(!!data));
    client.fetch(`*[_type == "testimonial"][0]`).then(data => setShowTestimonials(!!data));
    client.fetch(`*[_type == "blog"][0]`).then(data => setShowBlog(!!data));
    client.fetch(`*[_type == "gallery"][0]`).then(data => setShowGallery(!!data));
  }, []);

  return (
    <>
      <Navigations 
        showResearch={showResearch} 
        showTestimonials={showTestimonials}
        showBlog={showBlog}
        showGallery={showGallery}
      />
      <Home />
      <About />
      <Academics />
      <Experience />
      {showResearch && <Research />}
      {showTestimonials && <Testimonials />}
      {showBlog && <Blog />}
      {showGallery && <Gallery />}
      <Presence />
      <Contact />
    </>
  );
}

export default App;