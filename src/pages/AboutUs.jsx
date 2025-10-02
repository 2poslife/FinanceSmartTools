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
              
              <a 
                href="https://www.instagram.com/cpa.zedan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-link"
              >
                <div className="instagram-icon"></div>
                <span className="instagram-text">cpa.zedan</span>
              </a>
              
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
          <p className="about-section-subtitle">
            اكتسب المهارات العملية التي يستخدمها المحاسبون لإدارة ملفات الأفراد والشركات.
            من التقارير المالية، فتح الملفات، التعامل مع الضرائب، تأمين وطني، استرجاع ضرائب، تدقيق تقارير الشركات وغيرها..
          </p>
          
          <h2 className="about-section-title">دورات للأفراد والشركات</h2>
          
          <p className="about-section-intro">
            دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:
          </p>
          
          <div className="about-courses-grid">
            <div className="about-course-card">
              <div className="about-course-icon">
                <div className="about-icon-circle">
                  <div className="icon-users"></div>
                </div>
              </div>
              <h3 className="about-course-title">الأفراد</h3>
              <p className="about-course-description">
                دورات متخصصة تهدف إلى تمكين المحاسبين من إدارة ملفات المستقلين بشكل شامل، من الألف إلى الياء، باحترافية ووفق المعايير المهنية.
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
              <h3 className="value-title">الشفافية</h3>
              <p className="value-description">
                نؤمن بأن الزبون يجب أن يعرف كل التفاصيل بوضوح، ومن دون أي مفاجآت.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">الاحترافية والدقة</h3>
              <p className="value-description">
                نلتزم بأعلى معايير المهنة والدقة في كل خدمة نقدمها.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">المسؤولية</h3>
              <p className="value-description">
                نتعامل مع كل ملف، وكل معاملة، وكل زبون وكأنه الوحيد، ونمنحه الخدمة على أتم وجه.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">الابتكار</h3>
              <p className="value-description">
                نواكب التغييرات في القوانين والتكنولوجيا لنقدم حلولًا ذكية وعملية.
              </p>
            </div>
            
            <div className="value-logo-wrapper">
              <img src="/logo.png" alt="Logo" className="values-logo" />
            </div>
            
            <div className="value-card">
              <h3 className="value-title">الثقة</h3>
              <p className="value-description">
                هدفنا أن نبني علاقة طويلة المدى قائمة على الصدق والالتزام.
              </p>
            </div>
          </div>
          
          <div className="values-conclusion-card">
            <svg className="conclusion-decoration-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <line x1="0" y1="10" x2="80" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
              <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="2"/>
              <line x1="0" y1="50" x2="70" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2"/>
            </svg>
            <svg className="conclusion-decoration-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <line x1="20" y1="10" x2="100" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
              <line x1="40" y1="30" x2="100" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="2"/>
              <line x1="30" y1="50" x2="100" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2"/>
            </svg>
            <p className="values-conclusion-text">
              في مكتبنا، نعمل على أساس قيم واضحة: الشفافية مع عملائنا، الاحترافية في كل خدمة، المسؤولية الكاملة عن النتائج، والابتكار في الحلول.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
