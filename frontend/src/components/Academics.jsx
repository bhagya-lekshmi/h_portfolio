import React, { useState, useEffect } from 'react';
import { client } from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Academics() {
  const [academics, setAcademics] = useState([]);

  useEffect(() => {
    const query = '*[_type == "academic"]';
    client.fetch(query).then((data) => {
    const sorted = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    setAcademics(sorted);
    });
  }, []);

  return (
    <section id="academics" className="section lb">
      <div className="container">
        <div className="section-title text-left">
          <h3>Academics</h3>
        </div>
        <div className="row">
          {academics.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="services-inner-box">
                <div className="ser-icon">
                  <i className={item.iconClass}></i>
                </div>
                <p>
                  {item.institution} <br />
                  {new Date(item.startDate).toLocaleString('default', {
                    year: 'numeric',
                  })}{' '}
                  -{' '}
                  {item.endDate
                    ? new Date(item.endDate).toLocaleString('default', {
                        year: 'numeric',
                      })
                    : 'Present'}{' '}
                  <br />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

