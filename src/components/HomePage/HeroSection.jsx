import React, { useState } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-content">
        <img className="hero-section-logo" src="/logo.png" alt="" />
        <img
          className="hero-section-Title"
          src="/HeroSection/Title.svg"
          alt=""
        />
        <button className="hero-section-button">دوراتنا</button>
      </div>
      <div className="hero-section-shelf">
        <div className="hero-section-top-shelf">
          <img className="hero-shelf-compass" src="/HeroSection/Compass.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
