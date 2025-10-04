import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigLeftDashIcon,
  Calculator,
  TrendingUp,
} from "lucide-react";

function HeroSection() {
  return (
    <section className="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="hero-text-container">
          <h2 className="hero-office-name">זידאן משרד ראיית חשבון</h2>
          <div className="hero-separator"></div>
          <p className="hero-services">יועץ כלכלי | עסקי | פיננסי</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
