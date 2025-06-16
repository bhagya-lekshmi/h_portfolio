import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "about"]';
    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <div id="about" className="section wb">
      <div className="container">
        {abouts.map((about, index) => (
          <div className="row" key={index}>
            <div className="col-md-6">
              <div className="message-box">
                <h2>About Me</h2>
                <p>{about.description}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="right-box-pro wow fadeIn">
                <img
                  src={urlFor(about.imgUrl)}
                  alt="About"
                  className="img-fluid img-rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
