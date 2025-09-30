import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import "./ContactComponent.css";
export default function ContactComponent() {
  return (
    <section className="about-contact">
      <h2>تواصل معنا</h2>
      <p>نحن هنا لمساعدتك في رحلتك المحاسبية</p>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="icon-wrapper">
            <MapPin className="icon" />
          </div>
          <h3>موقعنا</h3>
          <p>
            المغار | 📍 <br />
            شارع
          </p>
        </div>

        <div className="contact-card">
          <div className="icon-wrapper">
            <Mail className="icon" />
          </div>
          <h3>راسلنا</h3>
          <p>
            info@accounting-office.com
            <br />
            training@accounting-office.com
          </p>
        </div>

        <div className="contact-card">
          <div className="icon-wrapper">
            <Phone className="icon" />
          </div>
          <h3>اتصل بنا</h3>
          <p>
            +970 599 123 456
            <br />
            +970 567 890 123
          </p>
        </div>
      </div>
    </section>
  );
}
