import React, { useEffect, useState } from 'react';
import { client } from '../client';

export default function Academics() {
  const [academics, setAcademics] = useState([]);

  useEffect(() => {
    const query = '*[_type == "academic"]';
    client
      .fetch(query)
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        setAcademics(sorted);
      })
      .catch(console.error);
  }, []);

  const formatYear = (d) =>
    d ? new Date(d).toLocaleString('default', { year: 'numeric' }) : '';

  return (
    <section id="academics" className="section lb">
      <div className="container">
        <div className="section-title text-left">
          <h3>Academics</h3>
        </div>

        <div className="academics-grid">
          {academics.map((item) => (
            <article
              key={item._id || `${item.institution}-${item.startDate}`}
              className="academic-card"
            >
              {/* Header */}
              <header className="card-header">
                <div className="card-icon">
                  <i className={item.iconClass || 'fa-solid fa-graduation-cap'} />
                </div>
                <h4 className="institution">{item.institution}</h4>
              </header>

              {/* Degree */}
              {(item.title || item.degree) && (
                <div className="degree">
                  <i className="fa-solid fa-user-graduate"></i>{' '}
                  {item.title || item.degree}
                </div>
              )}

              {/* Area of Study */}
              {item.areaOfStudy && (
                <p className="area-of-study">
                  <i className="fa-solid fa-book"></i> {item.areaOfStudy}
                </p>
              )}

              {/* Meta Info */}
              <div className="meta">
                <span className="date">
                  <i className="fa-regular fa-calendar-days"></i>{' '}
                  {formatYear(item.startDate)} –{' '}
                  {item.endDate ? formatYear(item.endDate) : 'Present'}
                </span>
                {item.location && (
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i>{' '}
                    {item.location}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
