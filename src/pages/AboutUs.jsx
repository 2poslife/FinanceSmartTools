import React from "react";
import "./AboutUs.css";
import logoImage from "../assets/logo.png";

function AboutUs() {
  return (
    <div className="about-us-page">
      {/* Main Content */}
      <div className="about-main-content">
        {/* Left Section - WhatsApp Image Background */}
        <div className="about-left-section">
          <div className="whatsapp-image-background">
            {/* Overlay Box with Arabic Text */}
            <div className="vision-overlay">
              <div className="overlay-content">
                <p className="vision-text">رؤيتنا مبنية على مبدأ:</p>
                <p className="vision-principle">المعرفة ليست حكرًا على أحد</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Arabic Content */}
        <div className="about-right-section">
          <div className="content-wrapper">
            <h1 className="main-title">
              <span className="title-highlight">مكتب حسابات</span>
              <span className="title-subtitle">برؤية مختلفة</span>
            </h1>
            <br></br>
            <div className="content-body">
              <p className="content-paragraph">
                نحن مكتب حسابات مستقل، نقدم خدمات مالية محاسبية وضريبية بجودة عالية وبمهنية تامة. 
                يجمع مكتبنا بين الخبرة العملية والمعرفة الأكاديمية، لنقدم لكل عميل خدمة دقيقة، سريعة، وشفافة.
              </p>
              
              <p className="content-paragraph">
                منذ تأسيس مكتب زيدان، لم يقتصر دورنا على تقديم الخدمات، بل أخذنا على عاتقنا مرافقة الأشخاص ودعمهم، 
                سواء في حقوقهم كموظفين، فهمهم لعالم الضرائب، أو شرح القوانين الجديدة بشكل مبسط.
              </p>
              
              <p className="content-paragraph">
                إذا كنت تعرف صفحتنا في الإنستغرام، فأنت بالتأكيد تعرف حجم المعلومات التي قدمناها على مدار السنوات.
              </p>
              
              <p className="content-paragraph">
                وإذا لم تتعرف عليها بعد - حان الوقت لتزورنا وتتعرف علينا أكثر:
              </p>
              
              <div className="instagram-link">
                <div className="instagram-icon"></div>
                <span className="instagram-text">cpa.zedan</span>
              </div>
              
              <p className="final-message">
                وكما عودناكم دائمًا، مستمرون في مساعدتكم لتصبحوا محاسبين مستقلين ناجحين بأعمالكم. 
                أو موظفين محترفين، واثقين بأنفسهم، غير معتمدين على أحد.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="about-courses-section">
        <div className="about-container">
          <h2 className="about-section-title">دورات للأفراد والشركات</h2>
          <p className="about-section-intro">
            نحن نقدم كورسات مصممة لتناسب احتياجات المحاسبين في التعامل مع:
          </p>
          
          <div className="about-courses-grid">
            <div className="about-course-card">
              <div className="about-course-icon">
                <div className="about-icon-circle">
                  <div className="icon-users"></div>
                </div>
              </div>
              <h3 className="about-course-title">الأفراد - أجيرين ومستقلين</h3>
              <p className="about-course-description">
                <br></br>

                كورسات متخصصة لمساعدة الأفراد على فهم حقوقهم وواجباتهم الضريبية والمالية.
              </p>
            </div>
            
            <div className="about-course-card">
              <div className="about-course-icon">
                <div className="about-icon-circle">
                  <div className="icon-document"></div>
                </div>
              </div>
              <h3 className="about-course-title">الشركات - تقارير مالية، إدارة حسابات وتدقيق تقارير</h3>
              <p className="about-course-description">
                دورات متقدمة للمحاسبين في الشركات لتطوير مهاراتهم في إعداد التقارير وإدارة الحسابات.
              </p>
            </div>
          </div>
          
          <p className="about-courses-conclusion">
            كل مجال له أدواته، لغته، وتقنياته - وهنا ستجد كورسات متخصصة لكل مجال لتكون محاسبا أكثر احتراقا وأكثر ثقة.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">قيمنا ومبادئنا</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <div className="icon-circle">
                  <div className="icon-education"></div>
                </div>
              </div>
              <h3 className="value-title">التعليم أولاً</h3>
              <p className="value-description">
                تؤمن بأن التعليم المحاسبي الجيد يبني أساساً قوياً للنجاح المهني.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <div className="icon-circle">
                  <div className="icon-check"></div>
                </div>
              </div>
              <h3 className="value-title">دقة وموثوقية</h3>
              <p className="value-description">
                نلتزم بأعلى معايير الدقة والشفافية في جميع خدماتنا.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <div className="icon-circle">
                  <div className="icon-team"></div>
                </div>
              </div>
              <h3 className="value-title">فريق متميز</h3>
              <p className="value-description">
                مجموعة من أفضل المحاسبين والمدققين المعتمدين.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <div className="icon-circle">
                  <div className="icon-experience"></div>
                </div>
              </div>
              <h3 className="value-title">الخبرة والاحترافية</h3>
              <p className="value-description">
                أكثر من 15 عاماً من الخبرة في مجال المحاسبة والتدقيق.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
