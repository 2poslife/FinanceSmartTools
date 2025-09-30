import React from "react";
import { Phone } from "lucide-react";
import "./AboutHero.css";
import AboutHeroImage from "../../assets/aboutImage.jpg";
export default function AboutHero() {
  return (
    <section className="aboutus-hero">
      <div className="aboutus-hero-image">
        <img src={AboutHeroImage} alt="عن مكتب المحاسبة" />
      </div>
      <div className="aboutus-hero-content">
        <h1>حول مكتب زيدان</h1>
        <p>
          منذ تأسيس مكتب زيدان، لم يقتصر دورنا على تقديم الخدمات، بل أخذنا على
          عاتقنا مرافقة الأشخاص ودعمهم، سواء في حقوقهم كموظفين، فهمهم لعالم
          الضرائب، أو شرح القوانين الجديدة بشكل مبسّط. إذا كنت تعرف صفحتنا في
          الإنستغرام، فأنت بالتأكيد تعرف حجم المعلومات التي قدّمناها على مدار
          السنوات. وإذا لم تتعرف عليها بعد — حان الوقت لتزورنا
          وتتعرف علينا أكثر:
        </p>
        <div className="aboutus-buttons">
          <button className="aboutus-btn primary">
            <Phone className="w-6 h-6" /> تواصل معنا
          </button>
          <button className="aboutus-btn secondary">استكشف خدماتنا</button>
        </div>
      </div>
    </section>
  );
}
