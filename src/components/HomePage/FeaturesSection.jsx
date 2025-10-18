import React from 'react';
import Illustration2 from '../../assets/Illustration 2 .svg';
import '../../styles/HomePage/FeaturesSection.css';

function FeaturesSection() {
    const features = [
       "دورات دقيقة ومحدثة باستمرار",
        "محتوى شامل ومفصل",
     "إرشاد وتطبيق عملي متخصص",
        "دعم وتوجيه شخصي على مدار الساعة",

    ];

    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-content">
                    <div className="features-text">
                        <h2 className="features-title">دوراتنا المتميزة</h2>
                        <p className="features-description">
                        طوّر مهاراتك المحاسبية من الأساس إلى الاحتراف من خلال دورات عملية وشاملة.
                        </p>
                        
                        <ul className="features-list">
                            {features.map((feature, index) => (
                                <li key={index} className="features-item">
                                    <div className="features-checkmark"></div>
                                    <span className="features-text-item">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="features-illustration">
                        <img src={Illustration2} alt="Features Illustration" className="features-image" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
