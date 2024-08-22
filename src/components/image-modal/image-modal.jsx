import React from "react";
import CloseButton from "../../assets/close-button.svg";
import "./image-modal.css";

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Enlarged" />
        <button className="close-button" onClick={onClose}>
          <img src={CloseButton} alt="Close Button" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
