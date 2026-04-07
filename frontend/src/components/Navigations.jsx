import { useEffect, useState } from 'react';

export default function Navigations({ showResearch, showTestimonials, showBlog, showGallery }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('mainNav');
      if (window.scrollY > 50) nav.classList.add('navbar-shrink');
      else nav.classList.remove('navbar-shrink');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">

        {/* Left: Logo */}
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <img
            className="img-fluid"
            src="/hkj.png"
            alt="Logo"
            style={{ width: 70, height: 70 }}
          />
        </a>

        {/* Mobile View: Toggler + LinkedIn side by side */}
        <div className="d-flex align-items-center gap-3 d-lg-none">
          <a
            href="https://www.linkedin.com/in/helen-k-joy-519188a1/"
            className="li-cta"
            aria-label="Open LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect on LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars ms-1"></i>
          </button>
        </div>

        {/* Collapse (Menu) */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarResponsive">
          <ul className="navbar-nav text-uppercase me-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('academics')}>Academics</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('experience')}>Experience</button>
            </li>
            {showResearch && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => scrollToSection('research')}>Portfolio</button>
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
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('presence')}>Presence</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('contact')}>Contact</button>
            </li>
          </ul>

          {/* Desktop-only LinkedIn (right end) */}
          <ul className="navbar-nav ms-auto align-items-center d-none d-lg-flex">
            <li className="nav-item">
              <a
                href="https://www.linkedin.com/in/helen-k-joy-519188a1/"
                className="li-cta"
                aria-label="Open LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
