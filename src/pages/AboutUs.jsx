import React from "react";
import AboutHero from "../components/AboutUs/AboutHero";
import AboutValues from "../components/AboutUs/AboutValues";
import AboutStats from "../components/AboutUs/AboutStats";
import AboutServices from "../components/AboutUs/AboutServices";
import ContactComponent from "../components/ContactComponent";

function AboutUs() {
  return (
    <div>
      <AboutHero />
      <AboutValues />
      <AboutStats />
      <AboutServices />
      <ContactComponent />
    </div>
  );
}

export default AboutUs;
