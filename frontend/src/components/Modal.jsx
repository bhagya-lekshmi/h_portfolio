import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose} // close modal on clicking outside the content
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 5,
          maxWidth: '80%',
          maxHeight: '80%',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: 20,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
