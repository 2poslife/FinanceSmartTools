import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Calculator, Phone, Target, Users, Award } from "lucide-react";
import "../styles/AboutUs.css";
import { CheckCircle, BookOpen, Briefcase, GraduationCap, FileSpreadsheet, Settings } from "lucide-react";
import { MapPin, Mail } from "lucide-react";

export default function AboutUs() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/SigninForm");
    };

    return (
        <div className="aboutus-page" dir="rtl">
            {/* Header */}
            <header className="aboutus-header">
                <div className="aboutus-logo" onClick={() => navigate("/")}>
                    <Calculator className="aboutus-logo-icon" />
                    <span className="aboutus-logo-text">FinanceSmartTools</span>
                </div>
                <div className="aboutus-actions">
                    <button onClick={() => navigate("/")} className="aboutus-btn home">
                        <Home className="w-5 h-5" /> דף הבית
                    </button>
                    <button onClick={handleLogout} className="aboutus-btn danger">
                        <LogOut className="w-5 h-5" /> התנתק
                    </button>
                </div>
            </header>

            {/* First Section */}
            <section className="aboutus-hero">
                <h1>حول مكتب المحاسبة المتقدم</h1>
                <p>
                    نحن مكتب محاسبة رائد متخصص في تقديم التدريب المحاسبي عالي الجودة والأدوات
                    التفاعلية التي تساعد المحاسبين على تطوير مهاراتهم وتحقيق النجاح المهني.
                </p>
                <div className="aboutus-buttons">
                    <button className="aboutus-btn primary">
                        <Phone className="w-6 h-6" /> تواصل معنا
                    </button>
                    <button className="aboutus-btn secondary">استكشف خدماتنا</button>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values" dir="rtl">
                <div className="container">
                    <h2>قيمنا ومبادئنا</h2>
                    <p>نؤمن بأن التعليم المحاسبي الجيد يبني أساساً قوياً للنجاح المهني</p>

                    <div className="values-grid">
                        <div className="value-card">
                            <Target className="value-icon" />
                            <h3>دقة وموثوقية</h3>
                            <p>نلتزم بأعلى معايير الدقة والشفافية في جميع خدماتنا</p>
                        </div>

                        <div className="value-card">
                            <Users className="value-icon" />
                            <h3>فريق متميز</h3>
                            <p>مجموعة من أفضل المحاسبين والمدققين المعتمدين</p>
                        </div>

                        <div className="value-card">
                            <Award className="value-icon" />
                            <h3>الخبرة والاحترافية</h3>
                            <p>أكثر من 15 عاماً من الخبرة في مجال المحاسبة والتدقيق</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW Stats Section */}
            <section className="about-stats">
                <h2>إنجازاتنا بالأرقام</h2>
                <p>نفتخر بما حققناه من نجاحات مع طلابنا وعملائنا</p>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>+2000</h3>
                        <p>طالب تخرج</p>
                    </div>
                    <div className="stat-card">
                        <h3>+50</h3>
                        <p>دورة تدريبية</p>
                    </div>
                    <div className="stat-card">
                        <h3>95%</h3>
                        <p>معدل نجاح الطلبة</p>
                    </div>
                    <div className="stat-card">
                        <h3>15</h3>
                        <p>سنة خبرة</p>
                    </div>
                </div>
            </section>

            <section className="about-services">
                <h2>خدماتنا المتميزة</h2>
                <p>نقدم مجموعة شاملة من الخدمات التعليمية والتدريبية المحاسبية</p>

                <div className="services-grid">
                    <div className="service-item">
                        <CheckCircle />
                        <span>تدريب على برامج المحاسبة الحديثة</span>
                    </div>
                    <div className="service-item">
                        <BookOpen />
                        <span>دورات المحاسبة الأساسية والمتقدمة</span>
                    </div>
                    <div className="service-item">
                        <Briefcase />
                        <span>استشارات محاسبية متخصصة</span>
                    </div>
                    <div className="service-item">
                        <Settings />
                        <span>ورش عمل في التدقيق المحاسبي</span>
                    </div>
                    <div className="service-item">
                        <GraduationCap />
                        <span>شهادات معتمدة ومعترف بها</span>
                    </div>
                    <div className="service-item">
                        <FileSpreadsheet />
                        <span>أدوات حاسبة محاسبية تفاعلية</span>
                    </div>
                </div>
            </section>
            <section className="about-contact">
                <h2>تواصل معنا</h2>
                <p>نحن هنا لمساعدتك في رحلتك المحاسبية</p>

                <div className="contact-grid">
                    <div className="contact-card">
                        <div className="icon-wrapper green">
                            <MapPin className="icon" />
                        </div>
                        <h3>موقعنا</h3>
                        <p>رام الله، فلسطين<br />شارع الإرسال، مجمع الأعمال</p>
                    </div>

                    <div className="contact-card">
                        <div className="icon-wrapper blue">
                            <Mail className="icon" />
                        </div>
                        <h3>راسلنا</h3>
                        <p>
                            info@accounting-office.com<br />
                            training@accounting-office.com
                        </p>
                    </div>

                    <div className="contact-card">
                        <div className="icon-wrapper orange">
                            <Phone className="icon" />
                        </div>
                        <h3>اتصل بنا</h3>
                        <p>
                            +970 599 123 456<br />
                            +970 567 890 123
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
