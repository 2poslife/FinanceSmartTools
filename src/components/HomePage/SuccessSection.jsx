import React from 'react';
import './SuccessSection.css';
import downloadImage from '../../assets/download.jpg';

function SuccessSection() {
    return (
        <section className="success-section">
            <div className="success-container">
                <div className="success-content">
                    <div className="success-image">
                        <img src={downloadImage} alt="Success Story" className="success-img" />
                    </div>
                    
                    <div className="success-text">
                        <h2 className="success-title">🎉 قصص نجاح طلابنا</h2>
                        <p className="success-description">
                            اكتشف كيف حقق طلابنا أهدافهم المهنية من خلال دوراتنا وخدماتنا المتخصصة
                        </p>
                        
                        <div className="success-stats">
                            <div className="stat-item">
                                <span className="stat-number">1000+</span>
                                <span className="stat-label">طالب ناجح</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">معدل النجاح</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">شركة شريكة</span>
                            </div>
                        </div>
                        
                        <button className="success-btn">
                            📈 ابدأ رحلتك نحو النجاح
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SuccessSection;

