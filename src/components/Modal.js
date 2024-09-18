import React from 'react';
import './Modal.css'; 

function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}

      </div>
    </div>
  );
}

export default Modal;
