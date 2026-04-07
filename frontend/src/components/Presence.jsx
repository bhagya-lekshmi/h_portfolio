import React, { useEffect } from "react";

// ✅ Social / Academic links
const LINKS = [
  {
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin",
    url: "https://www.linkedin.com/in/helen-k-joy-519188a1/",
  },
  {
    label: "ResearchGate",
    icon: "fa-brands fa-researchgate",
    url: "https://www.researchgate.net/profile/Helen-Joy?ev=hdr_xprf",
  },
  {
    label: "ORCID",
    icon: "fa-brands fa-orcid",
    url: "https://orcid.org/0000-0001-7776-3856",
  },
  // ✅ Scopus uses a logo image (not Font Awesome)
  {
    label: "Scopus",
    type: "image",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/scopus.svg",
    url: "https://www.scopus.com/authid/detail.uri?authorId=55811681700",
  },
  {
    label: "Medium",
    icon: "fa-brands fa-medium",
    url: "https://medium.com/@helenjoy88",
  },
];

// ✅ Main Component
export default function Presence() {
  useEffect(() => {
    // Initialize Bootstrap tooltips
    if (window.bootstrap) {
      Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
        (el) => new window.bootstrap.Tooltip(el)
      );
    }

    // Animate fade-in when icons appear
    const tiles = document.querySelectorAll(".dp-tile");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    tiles.forEach((tile) => observer.observe(tile));
  }, []);

  return (
    <div id="presence" className="section lb">
      <div className="container">
        {/* ✅ Section Title */}
        <div className="section-title text-left">
          <h3 className="dp-heading">Digital Presence</h3>
        </div>

        {/* ✅ Icon Grid */}
        <div className="dp-grid">
          {LINKS.map((item) => (
            <a
              key={item.label}
              className="dp-tile text-decoration-none"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              data-bs-toggle="tooltip"
              data-bs-title={item.label}
            >
              {item.type === "image" ? (
                <div className="dp-icon-circle">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="dp-icon-img"
                  />
                </div>
              ) : (
                <div className="dp-icon-circle">
                  <i className={item.icon}></i>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
