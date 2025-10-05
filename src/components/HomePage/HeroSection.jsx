import React from "react";
import "../../styles/HomePage/HeroSection.css";
import { Link } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigLeftDashIcon,
  Calculator,
  TrendingUp,
} from "lucide-react";

function HeroSection() {
  return (
    <section className="homepage-hero-section">
      {/* Background Image */}
      <div className="homepage-hero-bg">
        <div className="homepage-hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="homepage-hero-content">
        <div className="homepage-hero-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="homepage-hero-text-container">
          <h2 className="homepage-hero-office-name">זידאן משרד ראיית חשבון</h2>
          <div className="homepage-hero-separator"></div>
          <p className="homepage-hero-services">יועץ כלכלי | עסקי | פיננסי</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
