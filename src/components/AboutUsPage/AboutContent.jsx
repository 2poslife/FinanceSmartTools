import React from "react";
import "../../styles/AboutUsPage/AboutContent.css";

function AboutContent() {
  return (
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
  );
}

export default AboutContent;
