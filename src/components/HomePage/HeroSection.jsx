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
  // Log HeroSection dimensions
  React.useEffect(() => {
    const heroSection = document.querySelector('.homepage-hero-section');
    if (heroSection) {
      const logDimensions = () => {
        console.log('📏 HeroSection Dimensions:');
        console.log('  - Width:', heroSection.offsetWidth + 'px');
        console.log('  - Height:', heroSection.offsetHeight + 'px');
        console.log('  - Computed Width:', window.getComputedStyle(heroSection).width);
        console.log('  - Computed Height:', window.getComputedStyle(heroSection).height);
        console.log('  - Viewport Width:', window.innerWidth + 'px');
        console.log('  - Viewport Height:', window.innerHeight + 'px');
      };
      
      // Log immediately
      logDimensions();
      
      // Log after a short delay to ensure rendering is complete
      setTimeout(logDimensions, 100);
      
      // Log on window resize
      const handleResize = () => {
        setTimeout(logDimensions, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <section className="homepage-hero-section">
      {/* Background Image */}
      <div className="homepage-hero-bg">
        <div className="homepage-hero-overlay"></div>
      </div>
    </section>
  );
}

export default HeroSection;
