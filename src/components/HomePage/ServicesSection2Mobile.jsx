import React from 'react';
import '../../styles/HomePage/ServicesSection2Mobile.css';

function ServicesSection2Mobile() {
    const services = [
        {
            id: 1,
            title: "أدوات حاسبة محاسبية تفاعلية",
            description: "حاسبات متخصصة لحساب الضرائب والتكاليف والرواتب بدقة عالية",
            icon: "🧮",
            iconBg: "#FDF4E3"
        },
        {
            id: 2,
            title: "ورش عمل في التدقيق المحاسبي",
            description: "ورش تدريبية متخصصة في التدقيق المحاسبي والممارسات المهنية",
            icon: "📊",
            iconBg: "#FDF4E3",
            featured: true
        },
        {
            id: 3,
            title: "استشارات محاسبية متخصصة",
            description: "استشارات مهنية في المحاسبة والضرائب والتخطيط المالي",
            icon: "💼",
            iconBg: "#FDF4E3"
        },
        {
            id: 4,
            title: "دورات المحاسبة الأساسية والمتقدمة",
            description: "دورات شاملة من المبتدئ إلى المتقدم في المحاسبة المالية",
            icon: "📚",
            iconBg: "#FDF4E3"
        }
    ];

    return (
        <section className="services-section-2-mobile">
            <div className="services-container-2-mobile">
                <div className="services-header-2-mobile">
                    <span className="services-category-2-mobile">خدماتنا</span>
                    <h2 className="services-title-2-mobile">خدماتنا المتميزة</h2>
                    <p className="services-subtitle-2-mobile">نقدم حلول محاسبية شاملة ومتخصصة لجميع احتياجاتك</p>
                </div>
                
                <div className="services-grid-2-mobile">
                    {services.map(service => (
                        <div key={service.id} className="services-card-2-mobile">
                            <div className="services-icon-wrapper-2-mobile" style={{ backgroundColor: service.iconBg }}>
                                <span className="services-icon-2-mobile">{service.icon}</span>
                            </div>
                            
                            <div className="services-content-2-mobile">
                                <h3 className="services-card-title-2-mobile">{service.title}</h3>
                                <p className="services-card-description-2-mobile">{service.description}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="decorative-grid-2-mobile">
                <div className="grid-plus-2-mobile orange-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile purple-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
                <div className="grid-plus-2-mobile">++</div>
            </div>
        </section>
    );
}

export default ServicesSection2Mobile;
