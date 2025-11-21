import React from 'react';
import '../../styles/HomePage/FeaturesSection.css';
import { getImageUrl } from "@/lib/utils";
const Illustration2 = getImageUrl('Illustration 2 .svg');

function FeaturesSection() {
    const features = [
       "أدوات عملية وسهلة الاستخدام" ,
        "مساعدة في اتخاذ قرارات صحيحة\nبدون الحاجة للبحث المطوّل أو الحساب اليدوي",
     "تحديثات مستمرة لضمان دقة النتائج",
        "حلول واجوبة فورية لمشاكل تواجه المحاسبين",

    ];

    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-content">
                    <div className="features-text">
                        <h2 className="features-title">أدواتنا المحاسبية الذكية</h2>
                        <p className="features-description">
                        طوّر مهاراتك المحاسبية من خلال مجموعة من الآلات الحاسبة والادوات المساعدة المصممة خصيصًا للمحاسبين ومديري الحسابات.
كل آلة حاسبة تم بناؤها لتختصر عليك الوقت، وتقدّم لك أرقام دقيقة تساعدك في اتخاذ قرارات مالية مدروسة.
                        </p>
                        
                        <ul className="features-list">
                            {features.map((feature, index) => (
                                <li key={index} className="features-item">
                                    <div className="features-checkmark"></div>
                                    <span className="features-text-item" style={{ whiteSpace: 'pre-line' }}>{feature}</span>
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
