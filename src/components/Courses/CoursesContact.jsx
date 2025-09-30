import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Courses.css";

const CoursesContact = () => {
  return (
    <section className="courses-contact">
      <h2>تواصل معنا</h2>
      <div className="contact-grid">
        <div className="contact-card">
          <MapPin className="icon" />
          <h3>موقعنا</h3>
          <p>المغار | 📍 شارع</p>
        </div>

        <div className="contact-card">
          <Mail className="icon" />
          <h3>راسلنا</h3>
          <p>
            info@accounting-office.com <br />
            training@accounting-office.com
          </p>
        </div>

        <div className="contact-card">
          <Phone className="icon" />
          <h3>اتصل بنا</h3>
          <p>
            +970 599 123 456 <br />
            +970 567 890 123
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoursesContact;
