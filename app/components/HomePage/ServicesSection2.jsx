import React from 'react';
import '../../styles/HomePage/ServicesSection2.css';

function ServicesSection2() {
    const services = [
        {
            id: 1,
            title: "إدارة وتدقيق حسابات",
            description: "تجهيز ومراجعة تقارير سنوية للشركات والمستقلين",
            icon: "📊",
            iconBg: "#FDF4E3"
        },
        {
            id: 2,
            title: "استشارات مهنية",
            description: "استشارات مهنية في المحاسبة والضرائب والتخطيط المالي",
            icon: "💼",
            iconBg: "#FDF4E3",
            featured: true
        },
        {
            id: 3,
            title: "دورات تدريبية",
            description: "دورات من المبتدىء إلى المتقدم للمحاسبين",
            icon: "📚",
            iconBg: "#FDF4E3"
        },
        {
            id: 4,
            title: "آلات حاسبة ذكية",
            description: "أدوات عملية تساعدك في اتخاذ قرارات محاسبية دقيقة",
            icon: "🧮",
            iconBg: "#FDF4E3"
        },
        {
            id: 5,
            title: "مرافقة شخصية",
            description: "مرافقة شخصية من محاسبين معتمدين",
            icon: "🤝",
            iconBg: "#FDF4E3"
        },
        {
            id: 6,
            title: "مقالات ونصائح مهنية",
            description: "محتوى تعليمي ومقالات مهنية لتطوير مهاراتك المحاسبية",
            icon: "📝",
            iconBg: "#FDF4E3"
        }
    ];

    return (
        <section id="services-section" className="services-section-2">
            <div className="services-container-2">
                <div className="services-header-2">
                    <h2 className="services-title-2">خدمات محاسبة شاملة</h2>
                    <p className="services-subtitle-2">في مكان واحد!</p>
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
