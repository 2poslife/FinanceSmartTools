import React from 'react';
import Illustration2 from '../../assets/Illustration 2 .svg';
import '../../styles/HomePage/FeaturesSectionMobile.css';

function FeaturesSectionMobile() {
    const features = [
        "حسابات دقيقة ومحدثة باستمرار",
        "تقارير مالية شاملة ومفصلة",
        "استشارات محاسبية متخصصة",
        "دعم فني على مدار الساعة"
    ];

    return (
        <section className="features-section-mobile">
            <div className="features-container-mobile">
                <div className="features-content-mobile">
                    <div className="features-text-mobile">
                        <h2 className="features-title-mobile">خدماتنا المتميزة</h2>
                        <p className="features-description-mobile">
                            يمكنك الاستفادة من خدماتنا المحاسبية المتخصصة التي تقدم حلولاً شاملة لجميع احتياجاتك المالية والمحاسبية.
                        </p>
                        
                        <ul className="features-list-mobile">
                            {features.map((feature, index) => (
                                <li key={index} className="features-item-mobile">
                                    <div className="features-checkmark-mobile"></div>
                                    <span className="features-text-item-mobile">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="features-illustration-mobile">
                        <img src={Illustration2} alt="Features Illustration" className="features-image-mobile" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSectionMobile;
