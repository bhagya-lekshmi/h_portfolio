import React, { useEffect, useState } from 'react';
import { client } from '../client';
import imageUrlBuilder from '@sanity/image-url';
import ResearchModal from './ResearchModal';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Research() {
  const [researchItems, setResearchItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ You missed this

  useEffect(() => {
    client
      .fetch(`*[_type == "research"] | order(_createdAt desc) {
        _id,
        title,
        subtitle,
        location,
        country,
        date,
        description,
        image
      }`)
      .then((data) => setResearchItems(data))
      .catch(console.error);
  }, []);

  return (
    <div id="research" className="section lb">
      <div className="container">
        <div className="section-title text-left">
          <h3>Research Works</h3>
          <p>Explore recent research work contributions.</p>
        </div>
        <div className="event">
          <div className="container">
            <div className="row">
              {researchItems.map((item) => (
                <div className="col-sm-12 col-xs-12" key={item._id}>
                  <div className="box d-flex">
                    <div className="image">
                      <img
                        src={urlFor(item.image).width(300).url()}
                        className="img-responsive"
                        alt={item.title}
                      />
                    </div>
                    <div className="caption" style={{ flex: 1, paddingLeft: '20px' }}>
                      <h4>
                        {item.title}
                        <span className="pull-right"><b>{item.date}</b></span>
                      </h4>
                      <h5><strong>{item.subtitle}</strong></h5>
                      <ul className="list-inline">
                        <li><i className="icofont icofont-social-google-map"></i> {item.location}</li>
                        <li className="pull-right">{item.country}</li>
                      </ul>
                      <p style={{ textAlign: 'justify' }}>{item.description}</p>
                      <button type="button" onClick={() => setSelectedItem(item)}>View Details</button>
                    </div>
                  </div>
                </div>
              ))}

              {researchItems.length === 0 && <p>No research items found.</p>}

              {/* Modal */}
              <ResearchModal
                show={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
