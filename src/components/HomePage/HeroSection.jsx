import React, { useState } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [shelfVisible, setShelfVisible] = useState(false);

  const toggleShelf = () => setShelfVisible(!shelfVisible);

  return (
    <div className="hero-section">
      <img className="hero-section-table" src="/HeroSection/Table.svg" alt="" />
      <img className="hero-section-Title" src="/HeroSection/Title.svg" alt="" />
      <div className="hero-logo-wrapper">
        <img className="hero-section-logo" src="/logo.png" alt="" />
      </div>

      {/* Arrow button */}
      <button
        className={`shelf-toggle ${shelfVisible ? "active" : ""}`}
        onClick={toggleShelf}
      >
        &#9654; {/* Left arrow */}
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
