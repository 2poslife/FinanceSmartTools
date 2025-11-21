import React from 'react';
import '../../styles/HomePage/PurpleSectionMobile.css';
import { getImageUrl } from '../../utils/index.jsx';

function PurpleSectionMobile() {
  return (
    <section className="purple-section-mobile">
      <div className="purple-container-mobile">
        <img 
          src={getImageUrl('Section _final.svg')} 
          alt="Section Content" 
          className="section-svg-mobile"
        />
      </div>
    </section>
  );
}

export default PurpleSectionMobile;
