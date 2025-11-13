// ImageSection.jsx
import React from "react";
import "../../styles/HomePage/ImageSection.css";

function ImageSection() {
  return (
    <section className="image-section">
      <div className="image-container">
        <img
          src="https://d3egla0dyi6qxn.cloudfront.net/public/Section.png"
          alt="Section"
          className="section-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default ImageSection;
