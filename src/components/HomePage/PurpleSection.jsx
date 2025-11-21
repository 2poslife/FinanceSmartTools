import React from 'react';
import '../../styles/HomePage/PurpleSection.css';
import { getImageUrl } from '../../utils/index.jsx';

function PurpleSection() {
  return (
    <section className="purple-section">
      <div className="purple-container">
        <img 
          src={getImageUrl('Section _final.svg')} 
          alt="Section Content" 
          className="section-svg"
        />
      </div>
    </section>
  );
}

export default PurpleSection;
