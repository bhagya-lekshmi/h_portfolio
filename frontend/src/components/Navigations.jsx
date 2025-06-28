import { useEffect, useState } from 'react';

export default function Navigations({ showResearch, showTestimonials, showBlog, showGallery }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu on click
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('mainNav');
      if (window.scrollY > 50) {
        nav.classList.add('navbar-shrink');
      } else {
        nav.classList.remove('navbar-shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={() => scrollToSection('home')}>
          <img
            className="img-fluid"
            src="/hkj.png"
            alt="Logo"
            style={{ width: '70px', height: '70px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
        <i className="fa fa-bars ml-1"></i>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('academics')}>Academics</button>
            </li>
            {showResearch && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => scrollToSection('research')}>Research</button>
              </li>
            )}
            {showTestimonials && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => scrollToSection('testimonials')}>Testimonials</button>
              </li>
            )}
            {showBlog && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => scrollToSection('blog')}>Pulse</button>
              </li>
            )}
            {showGallery && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => scrollToSection('gallery')}>Gallery</button>
              </li>
            )}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('contact')}>Contact</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
