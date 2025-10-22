import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <img className="hero-section-bg" src="/HeroSection/Bg.svg" alt="" />
      <img className="hero-section-table" src="/HeroSection/Table.svg" alt="" />
      <img className="hero-section-Title" src="/HeroSection/Title.svg" alt="" />
      <div className="hero-logo-wrapper">
        <img className="hero-section-logo" src="/logo.png" alt="" />
      </div>
      <div className="hero-shelfs-wrapper">
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
