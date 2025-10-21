import React from 'react';
import '../../styles/HomePage/FixedBackgroundSectionMobile.css';

function FixedBackgroundSectionMobile() {
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
        <section className="fixed-bg-section-mobile">
            <div className="fixed-bg-content-mobile">
                <h2 className="fixed-bg-title-mobile">نقدم حلول محاسبية شاملة ومتخصصة لجميع احتياجاتك</h2>
                <div className="fixed-bg-services-mobile">
                    {services.map((service, index) => (
                        <div key={index} className="fixed-bg-service-mobile">
                            <div className="fixed-bg-service-icon-mobile">{service.icon}</div>
                            <h3 className="fixed-bg-service-title-mobile">{service.title}</h3>
                            <p className="fixed-bg-service-description-mobile">{service.description}</p>
                            <button className="fixed-bg-service-button-mobile">اكتشف المزيد</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FixedBackgroundSectionMobile;
