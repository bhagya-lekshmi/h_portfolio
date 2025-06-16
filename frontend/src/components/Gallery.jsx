import React, { useEffect, useState } from 'react';
import { client } from '../client'; 
import imageUrlBuilder from '@sanity/image-url';

// ✅ URL builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

// ✅ Modal component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.7)',display:'flex',justifyContent:'center',alignItems:'center',zIndex:1000}}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{backgroundColor:'#fff',padding:20,borderRadius:5,maxWidth:'80%',maxHeight:'80%',overflowY:'auto',position:'relative'}}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{position:'absolute',top:10,right:10,fontSize:24,border:'none',background:'transparent',cursor:'pointer'}}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// ✅ GalleryItem component
const GalleryItem = ({ src, alt, category }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`col-md-4 col-sm-6 gallery-grid ${category}`}
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="gallery-single fix">
          <img src={src} className="img-fluid" alt={alt} />
          <div className="img-overlay">
            <i className="fa fa-picture-o"></i>
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>{alt}</h2>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
      </Modal>
    </>
  );
};

// ✅ Gallery component
const Gallery = ({ setShowGallery }) => {
  const [filterKey, setFilterKey] = useState('all');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "gallery"] | order(_createdAt desc) {
      _id,
      title,
      category,
      image
    }`;

    client.fetch(query).then((data) => {
      setItems(data);
      if (data.length > 0) {
        setShowGallery(true);
      } else {
        setShowGallery(false);
      }
    });
  }, [setShowGallery]);

  const filteredItems = filterKey === 'all' ? items : items.filter(i => i.category === filterKey);

  return (
    <div id="gallery" className="section lb">
      <div className="container">
        <div className="section-title text-left">
          <h3>Gallery</h3>
        </div>

        <div className="gallery-menu row">
          <div className="col-md-12">
            <div className="button-group filter-button-group text-left">
              <button className={filterKey === 'all' ? 'active' : ''} onClick={() => setFilterKey('all')}>All</button>
              <button className={filterKey === 'career' ? 'active' : ''} onClick={() => setFilterKey('career')}>Career</button>
              <button className={filterKey === 'travel' ? 'active' : ''} onClick={() => setFilterKey('travel')}>Travel</button>
              <button className={filterKey === 'hobbies' ? 'active' : ''} onClick={() => setFilterKey('hobbies')}>Hobbies</button>
              <button className={filterKey === 'misc' ? 'active' : ''} onClick={() => setFilterKey('misc')}>Misc</button>
            </div>
          </div>
        </div>

        <div className="gallery-list row">
          {filteredItems.map((item) => (
            <GalleryItem
              key={item._id}
              src={urlFor(item.image)}
              alt={item.title}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Export default
export default Gallery;
