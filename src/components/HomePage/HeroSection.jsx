import React, { useState } from "react";
import "./HeroSection.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

const HeroSection = () => {
  const [shelfVisible, setShelfVisible] = useState(false);

  const toggleShelf = () => setShelfVisible(!shelfVisible);

  return (
    <div className="hero-section">
      <img className="hero-section-table" src="/HeroSection/Table.svg" alt="" />
      <div className="hero-section-content">
        <div className="hero-logo-wrapper">
          <img className="hero-section-logo" src="/logo.png" alt="" />
        </div>
        <img
          className="hero-section-Title"
          src="/HeroSection/Title.svg"
          alt=""
        />
        <div className="hero-section-buttons">
          <button>دوراتنا</button>
          <button>خدماتنا</button>
        </div>
      </div>

      {/* Arrow button */}
      <button
        className={`shelf-toggle ${shelfVisible ? "active" : ""}`}
        onClick={toggleShelf}
      >
        <FaArrowAltCircleRight /> {/* Left arrow */}
      </button>

      {/* Shelf */}
      <div className={`hero-shelfs-wrapper ${shelfVisible ? "show" : ""}`}>
        <img
          className="hero-section-shelfs"
          src="/HeroSection/BookShelfs.svg"
          alt=""
        />
        <img className="hero-compass" src="/HeroSection/Compass.svg" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
