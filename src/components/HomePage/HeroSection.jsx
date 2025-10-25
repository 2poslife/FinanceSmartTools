import React, { useState } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const [activeBook, setActiveBook] = useState(null);

  const books = [
    { id: 1, video: "/Video1.mp4" },
    { id: 2, video: "/Video2.mp4" },
    { id: 3, video: "/Video3.mp4" },
  ];
  const goToNavigate = () => {
    alert("Navigate");
  };
  const goToContact = () => {
    alert("Contact");
  };
  return (
    <div className="hero-section">
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
        <button className="hero-section-button">دوراتنا</button>
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
          className="hero-table-phone"
          src="/HeroSection/Phone.svg"
          alt=""
          onClick={goToContact}
        />
      </div>
    </div>
  );
};

export default HeroSection;
