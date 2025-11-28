import React from "react";
import "../../styles/NewJournalEntries/NewJournalEntriesMobile.css";
import NewJournalEntriesTable1 from "../NewJournalEntries2/NewJournalEntriesTable1";
import NewJournalEntriesTable2 from "../NewJournalEntries2/NewJournalEntriesTable2";
import NewJournalEntriesTable3 from "../NewJournalEntries2/NewJournalEntriesTable3";
import NewJournalEntriesTable4 from "../NewJournalEntries2/NewJournalEntriesTable4";
import NewJournalEntriesTable5 from "../NewJournalEntries2/NewJournalEntriesTable5";
import NewJournalEntriesTable6 from "../NewJournalEntries2/NewJournalEntriesTable6";

const sections = [
    {
        id: "income",
        title: "הכנסות",
        subtitle: "פירוט ההכנסות ומע\"מ עסקאות",
        icon: "📘",
        component: NewJournalEntriesTable1,
        dotClass: "green",
    },
    {
        id: "expenses",
        title: "הוצאות",
        subtitle: "פירוט ההוצאות ומע\"מ תשומות",
        icon: "📕",
        component: NewJournalEntriesTable2,
        dotClass: "red",
    },
    {
        id: "dividend",
        title: "דיבידנד",
        subtitle: "רישום חלוקת ותשלום דיבידנד",
        icon: "💰",
        component: NewJournalEntriesTable3,
        dotClass: "orange",
    },
    {
        id: "import",
        title: "חשבונית יבוא",
        subtitle: "רישום תנועות יומן עבור רשימון יבוא",
        icon: "📊",
        component: NewJournalEntriesTable4,
        dotClass: "purple",
    },
    {
        id: "inventory",
        title: "מלאי",
        subtitle: "רישום תנועות יומן עבור מלאי",
        icon: "📦",
        component: NewJournalEntriesTable5,
        dotClass: "brown",
    },
    {
        id: "self-invoice",
        title: "חשבונית מס עצמית",
        subtitle: "תיעוד פעולות החשבונית העצמית וגילום המע\"מ",
        icon: "🧾",
        component: NewJournalEntriesTable6,
        dotClass: "teal",
    },
];

const NewJournalEntriesMobile = () => {
    return (
        <div className="nje-mobile-page">
            <section className="nje-mobile-hero">
                <div className="nje-mobile-hero-card">
                    <span className="nje-mobile-hero-badge">פקודות יומן מלאות</span>
                    <h1 className="nje-mobile-hero-title">סקירת הפקודות לפי קטגוריות</h1>
                    <p className="nje-mobile-hero-subtitle" style={{ fontSize: '1rem', fontWeight: '600', color: '#1f1a17', marginBottom: '0.8rem', marginTop: '-0.3rem' }}>
                        הכלי הפשוט והמדויק לרישום פקודות יומן — בלחיצה אחת!
                    </p>
                    <p className="nje-mobile-hero-description">
                        גללו בין הקטגוריות כדי למצוא במהירות את הפקודות הרלוונטיות.
                        ניתן לעדכן את הערכים בהתאם לתרחישים השונים שלכם.
                    </p>
                </div>
            </section>

            <div className="nje-mobile-sections">
                {sections.map(
                    ({ id, title, subtitle, icon, component: SectionComponent, dotClass }) => {
                        const Component = SectionComponent;
                        return (
                        <details key={id} className="nje-mobile-section" open>
                            <summary className="nje-mobile-section-summary">
                                <span className="nje-mobile-section-icon" aria-hidden="true">
                                    {icon}
                                </span>
                                <div className="nje-mobile-section-text">
                                    <h2>{title}</h2>
                                    <p>{subtitle}</p>
                                </div>
                                <span className={`nje-mobile-dot nje-mobile-dot-${dotClass}`} aria-hidden="true" />
                            </summary>
                            <div className="nje-mobile-section-content">
                                <div className="nje-mobile-table-wrapper">
                                    <Component />
                                </div>
                            </div>
                        </details>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default NewJournalEntriesMobile;

