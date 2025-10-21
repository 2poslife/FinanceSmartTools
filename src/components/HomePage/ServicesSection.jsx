import React from 'react';
import '../../styles/HomePage/ServicesSection.css';

function ServicesSection() {
    const services = [
        {
            id: 1,
            title: "أدوات حاسبة محاسبية تفاعلية",
            description: "حاسبات متخصصة لحساب الضرائب والتكاليف والرواتب بدقة عالية",
            icon: "🧮",
            color: "#d4af37"
        },
        {
            id: 2,
            title: "ورش عمل في التدقيق المحاسبي",
            description: "ورش تدريبية متخصصة في التدقيق المحاسبي والممارسات المهنية",
            icon: "📊",
            color: "#2c5aa0"
        },
        {
            id: 3,
            title: "استشارات محاسبية متخصصة",
            description: "استشارات مهنية في المحاسبة والضرائب والتخطيط المالي",
            icon: "💼",
            color: "#8b5a2b"
        },
        {
            id: 4,
            title: "دورات المحاسبة الأساسية والمتقدمة",
            description: "دورات شاملة من المبتدئ إلى المتقدم في المحاسبة المالية",
            icon: "📚",
            color: "#2d5016"
        },
        {
            id: 5,
            title: "تدريب على برامج المحاسبة الحديثة",
            description: "تدريب عملي على أحدث برامج المحاسبة والأنظمة المحاسبية",
            icon: "💻",
            color: "#6b2c91"
        },
        {
            id: 6,
            title: "خدمات التدقيق والمراجعة المالية",
            description: "مراجعة شاملة للقوائم المالية والتقارير المحاسبية",
            icon: "🔍",
            color: "#1a5490"
        }
    ];

    return (
        <section className="homepage-services-section">
            <div className="homepage-services-container">
                <h2 className="homepage-services-title">خدماتنا المتميزة</h2>
                <p className="homepage-services-subtitle">نقدم حلول محاسبية شاملة ومتخصصة لجميع احتياجاتك</p>
                
                <div className="homepage-services-grid">
                    {services.map(service => (
                        <div key={service.id} className="homepage-service-card">
                            <div className="homepage-service-icon" style={{ backgroundColor: service.color }}>
                                <span className="homepage-icon-emoji">{service.icon}</span>
                            </div>
                            
                            <div className="homepage-service-content">
                                <h3 className="homepage-service-title">{service.title}</h3>
                                <p className="homepage-service-description">{service.description}</p>
                            </div>
                            
                            <div className="homepage-service-footer">
                                <button className="homepage-service-btn" style={{ backgroundColor: service.color }}>
                                    اكتشف المزيد
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
