import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Calculator,
    User,
    Users,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
} from "lucide-react";
import "../styles/CalculatorsPage.css";

export default function CalculatorsPage() {
    const navigate = useNavigate();

    const simulators = [
        {
            title: "מחשבון עצמאי זעיר",
            desc: "חשב כמה מס על עצמאי זעיר",
            link: "/simulators/micro-self-employed",
            icon: <User className="sim-icon" />,
        },
        {
            title: "מחשבון עצמאי זעיר + שכיר",
            desc: "בדיקה משולבת לעצמאי זעיר ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (רק מיסים ללא פנסיה)",
            desc: "חשב את עלות העובד רק מיסים ללא פנסיה",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (כולל פנסיה)",
            desc: "חשב את עלות העובד עם פנסיה מלאה",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="sim-icon" />,
        },
        {
            title: "מחשבון עצמאי - ביטוח לאומי",
            desc: "חשב את הביטוח לאומי לעצמאי",
            link: "/simulators/self-employed",
            icon: <Briefcase className="sim-icon" />,
        },
    ];

    const handleSimulatorClick = (link) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("עליך להתחבר כדי להשתמש במחשבון");
            navigate("/SigninForm"); // redirect to login page
        } else {
            navigate(link); // allow navigation
        }
    };

    return (
        <div className="sim-page" dir="rtl">
            {/* Intro */}
            <section className="sim-intro">
                <h1>מחשבונים וסימולטורים</h1>
                <p className="sim-tagline">
                    כלי חישוב חכמים – הדרך הפשוטה לתכנון פיננסי נכון
                </p>
            </section>

            {/* Simulators */}
            <section className="sim-list">
                <h2 className="sim-section-title">
                    <Calculator className="inline-icon" /> מיסוי ועבודה
                </h2>

                <div className="sim-grid">
                    {simulators.map((sim, idx) => (
                        <div
                            key={idx}
                            className={`sim-card ${idx >= simulators.length - 2 ? "half-row" : ""}`}
                            onClick={() => handleSimulatorClick(sim.link)}
                        >
                            <div className="sim-card-header">
                                {sim.icon}
                                <h3>{sim.title}</h3>
                            </div>
                            <p>{sim.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
