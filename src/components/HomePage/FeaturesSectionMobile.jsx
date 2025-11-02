import React from 'react';
import Illustration2 from '../../assets/Illustration 2 .svg';
import '../../styles/HomePage/FeaturesSectionMobile.css';

function FeaturesSectionMobile() {
    const features = [
       "أدوات عملية وسهلة الاستخدام" ,
        "مساعدة في اتخاذ قرارات صحيحة\nبدون الحاجة للبحث المطوّل أو الحساب اليدوي",
     "تحديثات مستمرة لضمان دقة النتائج",
        "حلول واجوبة فورية لمشاكل تواجه المحاسبين",

    ];

    return (
        <section className="features-section-mobile">
            <div className="features-container-mobile">
                <div className="features-content-mobile">
                    <div className="features-text-mobile">
                        <h2 className="features-title-mobile">أدواتنا المحاسبية الذكية</h2>
                        <p className="features-description-mobile">
                        طوّر مهاراتك المحاسبية من خلال مجموعة من الآلات الحاسبة والادوات المساعدة المصممة خصيصًا للمحاسبين ومديري الحسابات.
كل آلة حاسبة تم بناؤها لتختصر عليك الوقت، وتقدّم لك أرقام دقيقة تساعدك في اتخاذ قرارات مالية مدروسة.
                        </p>
                        
                        <ul className="features-list-mobile">
                            {features.map((feature, index) => (
                                <li key={index} className="features-item-mobile">
                                    <div className="features-checkmark-mobile"></div>
                                    <span className="features-text-item-mobile" style={{ whiteSpace: 'pre-line' }}>{feature}</span>
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
