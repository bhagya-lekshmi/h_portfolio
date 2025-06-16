import React, { useState } from 'react';

const ResearchModal = ({ show, onClose, item }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!show || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-tabs">
          <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Details</button>
          <button onClick={() => setActiveTab('publications')} className={activeTab === 'publications' ? 'active' : ''}>Publications</button>
        </div>

        <div className="modal-content">
          {activeTab === 'details' && (
            <div className="modal-details">
              <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          )}

          {activeTab === 'publications' && (
            <div className="modal-publications">
              {item.publications?.length ? item.publications.map((pub, i) => (
                <div key={i} className="pub-entry">
                  <h4>{pub.name}</h4>
                  <p>{pub.details}</p>
                  <p><strong>Authors:</strong> {pub.authors}</p>
                  <p><strong>Date:</strong> {pub.date}</p>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">Read Publication</a>
                  <hr />
                </div>
              )) : <p>No publications found.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResearchModal;
