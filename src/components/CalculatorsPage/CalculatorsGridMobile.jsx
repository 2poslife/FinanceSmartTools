import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Calculator,
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

    const simulators = [
        {
            title: "מחשבון עצמאי זעיר",
            desc: "חשב כמה מס על עצמאי זעיר",
            link: "/simulators/micro-self-employed",
            icon: <User className="calculators-sim-icon" />,
        },
        {
            title: "מחשבון עצמאי זעיר + שכיר",
            desc: "בדיקה משולבת לעצמאי זעיר ושכיר",
            link: "/simulators/micro-self-employed-salaried",
            icon: <Users className="calculators-sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (רק מיסים ללא פנסיה)",
            desc: "חשב עלות העובד ״המיסויית״ למעסיק",
            link: "/simulators/employee-cost-no-pension",
            icon: <FileSpreadsheet className="calculators-sim-icon" />,
        },
        {
            title: "בדיקת עלות עובד (כולל פנסיה)",
            desc: "חשב את עלות העובד עם פנסיה מלאה",
            link: "/simulators/employee-cost-with-pension",
            icon: <ShieldCheck className="calculators-sim-icon" />,
        },
        {
            title: "מחשבון עצמאי - ביטוח לאומי",
            desc: "חשב את הביטוח לאומי לעצמאי",
            link: "/simulators/self-employed",
            icon: <Briefcase className="calculators-sim-icon" />,
        },
        {
            title: "מחשבון מס הכנסה ע״פ נקודות הזיכוי",
            desc: "חשב את מס ההכנסה ע״פ נקודות הזיכוי",
            link: "/simulators/IncomeTaxWithPoints",
            icon: <CreditCard className="calculators-sim-icon" />,
        },
    ];

    const handleSimulatorClick = (link) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("עליך להתחבר כדי להשתמש במחשבון");
            navigate("/SigninForm");
        } else {
            navigate(link);
        }
    };

    return (
        <section className="calculators-list">
            <h2 className="calculators-section-title">
                <span>מיסוי ועבודה</span>
                <Calculator className="calculators-inline-icon" />
            </h2>

            <div className="calculators-grid">
                {simulators.map((sim, idx) => (
                    <div
                        key={idx}
                        className="calculators-card"
                        onClick={() => handleSimulatorClick(sim.link)}
                    >
                        <div className="calculators-card-header">
                            {sim.icon}
                            <h3>{sim.title}</h3>
                        </div>
                        <p>{sim.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CalculatorsGridMobile;
