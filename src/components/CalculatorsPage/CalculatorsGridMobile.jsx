import React from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Users,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
    CreditCard,
} from "lucide-react";
import "../../styles/CalculatorsPage/CalculatorsGridMobile.css";

const CalculatorsGridMobile = () => {
    const navigate = useNavigate();

    const calculatorGroups = [
        {
            id: "employee-cost",
            title: "חישוב עלות עובד",
            icon: "🧮",
            simulators: [
                {
                    title: "בדיקת עלות עובד",
                    titleSecondLine: "(כולל פנסיה)",
                    desc: "חשב את עלות העובד למעסיק",
                    link: "/simulators/employee-cost-with-pension",
                    icon: <ShieldCheck className="calculators-sim-icon" />,
                    isFree: true,
                    freeNote: "🔥 ניתן להשתמש בחינם!"
                },
                {
                    title: "בדיקת עלות עובד",
                    titleSecondLine: "(רק מיסים ללא פנסיה)",
                    desc: "חשב עלות העובד ״המיסויית״ למעסיק",
                    link: "/simulators/employee-cost-no-pension",
                    icon: <FileSpreadsheet className="calculators-sim-icon" />,
                },
            ]
        },
        {
            id: "income-tax",
            title: "מס הכנסה",
            icon: "💰",
            simulators: [
                {
                    title: "מחשבון מס הכנסה ע״פ נקודות הזיכוי",
                    desc: "גלה כמה מס תשלם לפי ההכנסה שלך ונקודות הזיכוי",
                    link: "/simulators/IncomeTaxWithPoints",
                    icon: <CreditCard className="calculators-sim-icon" />,
                },
            ]
        },
        {
            id: "national-insurance",
            title: "ביטוח לאומי",
            icon: "📊",
            simulators: [
                {
                    title: "מחשבון ביטוח לאומי עוסק זעיר",
                    desc: "חשב כמה ישלם עצמאי בעל עוסק זעיר לביטוח לאומי",
                    link: "/simulators/micro-self-employed",
                    icon: <User className="calculators-sim-icon" />,
                },
                {
                    title: "מחשבון ביטוח לאומי עצמאי ושכיר",
                    desc: "חשב חבות ביטוח לאומי - עצמאי בלבד או עצמאי ושכיר",
                    link: "/simulators/micro-self-employed-salaried",
                    icon: <Users className="calculators-sim-icon" />,
                },
                {
                    title: "כלי עזר מקדמות ובחירת סוג תיק לעצמאי בביטוח לאומי",
                    desc: "חשב כמה דמי ביטוח לאומי ישלם עצמאי ומהי ההגדרה המתאימה לו",
                    link: "/simulators/self-employed",
                    icon: <Briefcase className="calculators-sim-icon" />,
                    isWide: true,
                },
            ]
        },
        {
            id: "journal-entries",
            title: "פקודות יומן",
            icon: "📘",
            simulators: [
                {
                    title: "פקודות יומן ",
                    desc: "פקודות יומן לדוחות כספיים",
                    link: "/simulators/new-journal-entries",
                    icon: <FileSpreadsheet className="calculators-sim-icon" />,
                },
            ]
        },
    ];

    const handleSimulatorClick = (link) => {
        const token = localStorage.getItem("access_token");
        const publicLinks = [
            "/simulators/employee-cost-with-pension",
            "/simulators/new-journal-entries",
        ];

        if (publicLinks.includes(link)) {
            navigate(link);
        } else if (!token) {
            alert("עליך להתחבר כדי להשתמש במחשבון");
            navigate("/SigninForm");
        } else {
            navigate(link);
        }
    };

    return (
        <section className="calculators-list">
            {calculatorGroups.map((group) => (
                <div key={group.id} className="calculators-group">
                    <div className="calculators-group-header">
                        <span className="calculators-group-icon">{group.icon}</span>
                        <h2 className="calculators-group-title">{group.title}</h2>
                    </div>
                    
                    <div className={`calculators-grid ${group.simulators.length === 1 ? 'single-card' : ''}`}>
                        {group.simulators.map((sim, idx) => (
                            <div
                                key={idx}
                                className={`calculators-card ${sim.isFree ? 'free-calculator' : ''} ${sim.isWide ? 'wide-card' : ''}`}
                                onClick={() => handleSimulatorClick(sim.link)}
                            >
                                <div className="calculators-card-header">
                                    {sim.icon}
                                    <h3>
                                        {sim.title}
                                        {sim.titleSecondLine && (
                                            <>
                                                <br />
                                                <span className="calculators-title-second-line">{sim.titleSecondLine}</span>
                                            </>
                                        )}
                                    </h3>
                                </div>
                                {sim.isFree && (
                                    <div className="calculators-free-badge">בחינם</div>
                                )}
                                <p>{sim.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
            <div className="calculators-conclusion">
                <p className="calculators-conclusion-text">
                    نوفر لك ادوات عملية تساعدك في اتخاذ قرارات محاسبية دقيقة
                </p>
            </div>
        </section>
    );
};

export default CalculatorsGridMobile;
