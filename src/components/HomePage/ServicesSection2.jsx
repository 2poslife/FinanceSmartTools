import React from 'react';
import '../../styles/HomePage/ServicesSection2.css';

function ServicesSection2() {
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
        <section className="services-section-2">
            <div className="services-container-2">
                <div className="services-header-2">
                    <h2 className="services-title-2">خدماتنا المتميزة</h2>
                    <p className="services-subtitle-2">نقدم حلول محاسبية شاملة ومتخصصة لجميع احتياجاتك</p>
                </div>
                
                <div className="services-grid-2">
                    {services.map(service => (
                        <div key={service.id} className="services-card-2">
                            <div className="services-icon-wrapper-2" style={{ backgroundColor: service.iconBg }}>
                                <span className="services-icon-2">{service.icon}</span>
                            </div>
                            
                            <div className="services-content-2">
                                <h3 className="services-card-title-2">{service.title}</h3>
                                <p className="services-card-description-2">{service.description}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="decorative-grid-2">
                <div className="grid-plus-2 orange-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2 purple-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
                <div className="grid-plus-2">++</div>
            </div>
        </section>
    );
}

export default ServicesSection2;
