import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [activeBook, setActiveBook] = useState(null);
  const navigate = useNavigate();
  const books = [
    { id: 1, video: "/Video1.mp4" },
    { id: 2, video: "/Video2.mp4" },
    { id: 3, video: "/Video3.mp4" },
  ];
  const goToNavigate = () => {
    const mapsUrl =
      "https://www.google.com/maps/place/Maghar/@32.8733419,35.3949619,14z/data=!3m1!4b1!4m6!3m5!1s0x151c3a6ef0bba4b7:0x7aabf869ce2d72b9!8m2!3d32.8872843!4d35.4091765!16zL20vMGc3bmx4?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D";
    window.open(mapsUrl, "_blank");
  };
  const goToContact = () => {
    navigate("/CalculatorsPage");
  };
  return (
    <div className="hero-section">
      <img className="hero-section-bg" src="/HeroSection/Bg.svg" alt="" />
      {activeBook && (
        <div className="video-overlay" onClick={() => setActiveBook(null)}>
          <video
            src={books.find((b) => b.id === activeBook).video}
            controls
            autoPlay
            className="video-player"
          />
        </div>
      )}
      <div className="hero-section-content">
        <img className="hero-section-logo" src="/logo.png" alt="" />
        <img
          className="hero-section-Title"
          src="/HeroSection/Title.svg"
          alt=""
        />
        <button className="hero-section-button">
          زيدان - مكتب تدقيق حسابات
        </button>
        <div className="hero-section-subtitle">
          من الاستشارة الى التنفيذ - كل الخدمات المحاسبية في مكان واحد
        </div>
      </div>
      <div className="hero-section-shelf">
        <div className="hero-section-top-shelf">
          <img
            className="hero-shelf-compass"
            src="/HeroSection/Compass.svg"
            alt=""
            onClick={goToNavigate}
          />
        </div>
        <div className="hero-shelf-books">
          {books.map((book) => (
            <div
              key={book.id}
              className="hero-shelf-book"
              onClick={() => setActiveBook(book.id)}
            >
              {book.id}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-section-table">
        <img
          className="hero-table-calculator"
          src="/HeroSection/Calculator.svg"
          alt=""
          onClick={goToContact}
        />
      </div>
    </div>
  );
};

export default HeroSection;
