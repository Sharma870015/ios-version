import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
