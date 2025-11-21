import React from 'react';
import '../../styles/HomePage/FixedBackgroundSection.css';

function FixedBackgroundSection() {
    const services = [
        {
            icon: "🧮",
            title: "أدوات حاسبة محاسبية تفاعلية",
            description: "حاسبات متخصصة لحساب الضرائب والتكاليف والرواتب بدقة عالية"
        },
        {
            icon: "📊",
            title: "ورش عمل في التدقيق المحاسبي",
            description: "ورش تدريبية متخصصة في التدقيق المحاسبي والممارسات المهنية"
        },
        {
            icon: "💼",
            title: "استشارات محاسبية متخصصة",
            description: "استشارات مهنية في المحاسبة والضرائب والتخطيط المالي"
        },
        {
            icon: "📚",
            title: "دورات المحاسبة الأساسية والمتقدمة",
            description: "دورات شاملة من المبتدئ إلى المتقدم في المحاسبة المالية"
        },
        {
            icon: "💻",
            title: "تدريب على برامج المحاسبة الحديثة",
            description: "تدريب عملي على أحدث برامج المحاسبة والأنظمة المحاسبية"
        },
        {
            icon: "🔍",
            title: "خدمات التدقيق والمراجعة المالية",
            description: "مراجعة شاملة للقوائم المالية والتقارير المحاسبية"
        }
    ];

    return (
        <section className="fixed-bg-section">
            <div className="fixed-bg-content">
                <h2 className="fixed-bg-title">نقدم حلول محاسبية شاملة ومتخصصة لجميع احتياجاتك</h2>
                <div className="fixed-bg-services">
                    {services.map((service, index) => (
                        <div key={index} className="fixed-bg-service">
                            <div className="fixed-bg-service-icon">{service.icon}</div>
                            <h3 className="fixed-bg-service-title">{service.title}</h3>
                            <p className="fixed-bg-service-description">{service.description}</p>
                            <button className="fixed-bg-service-button">اكتشف المزيد</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FixedBackgroundSection;
