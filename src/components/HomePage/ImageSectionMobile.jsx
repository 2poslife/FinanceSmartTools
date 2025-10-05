import React from "react";
import "../../styles/HomePage/ImageSectionMobile.css";

function ImageSectionMobile() {
  return (
    <section className="image-section-mobile">
      <div className="image-container-mobile">
        <div className="image-content-mobile">
          <img src="/Section.png" alt="Section Image" className="section-image-mobile" />
          <div className="image-overlay-mobile">
            <h2 className="image-title-mobile">حلول محاسبية متطورة</h2>
            <p className="image-subtitle-mobile">
              نقدم أحدث التقنيات والأدوات المحاسبية لضمان دقة وكفاءة عملك
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageSectionMobile;
