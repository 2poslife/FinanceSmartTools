// ImageSection.jsx
import React from "react";
import "../../styles/HomePage/ImageSection.css";
import { getImageUrl } from "@/lib/utils";

function ImageSection() {
  return (
    <section className="image-section">
      <div className="image-container">
        <img
          src={getImageUrl('Section.png')}
          alt="Section"
          className="section-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default ImageSection;
