// ImageSection.jsx
import React from "react";
import "./ImageSection.css";

function ImageSection() {
  return (
    <section className="image-section">
      <div className="image-container">
        <img
          src="/Section.png"
          alt="Section"
          className="section-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default ImageSection;
