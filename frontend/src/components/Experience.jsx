import React, { useEffect, useState } from 'react';
import { client } from '../client';

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "experience"]`)
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        setItems(sorted);
      })
      .catch(console.error);
  }, []);

  const fmt = (d) =>
    d ? new Date(d).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : '';

  if (!items.length) {
    return (
      <section id="experience" className="section lb">
        <div className="container timeline-container">
          <div className="section-title text-left">
            <h3>Experience</h3>
            <p>My professional journey through the years.</p>
          </div>
          <p className="text-muted">No experience entries found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section lb">
      <div className="container timeline-container">
        <div className="section-title text-left">
          <h3>Experience</h3>
        </div>

        <div className="timeline">
          <div className="timeline-rail" aria-hidden="true" />

          <div className="timeline-list">
            {items.map((it) => (
              <article
                className="tl-card exp"
                key={it._id || `${it.institution || it.company}-${it.startDate}`}
              >
                <div className="tl-card-badge" aria-hidden="true">
                  <i className="fa-solid fa-chalkboard-user" />
                </div>

                <h4 className="tl-card-title">{it.institution || it.company}</h4>

                {(it.role || it.title || it.position) && (
                  <div className="tl-card-sub">{it.role || it.title || it.position}</div>
                )}

                <div className="tl-meta">
                  <span className="tl-meta-chip">
                    <i className="fa-regular fa-calendar-days" />
                    {fmt(it.startDate)} – {it.endDate ? fmt(it.endDate) : 'Present'}
                  </span>
                  {it.location && (
                    <span className="tl-meta-chip">
                      <i className="fa-solid fa-location-dot" />
                      {it.location}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
