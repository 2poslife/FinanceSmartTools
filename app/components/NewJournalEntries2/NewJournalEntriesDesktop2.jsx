import React from "react";
import "./NewJournalEntriesDesktop2.css";
import NewJournalEntriesTable1 from "./NewJournalEntriesTable1";
import NewJournalEntriesTable3 from "./NewJournalEntriesTable3";
import NewJournalEntriesTable2 from "./NewJournalEntriesTable2";
import NewJournalEntriesTable4 from "./NewJournalEntriesTable4";
import NewJournalEntriesTable5 from "./NewJournalEntriesTable5";
import NewJournalEntriesTable6 from "./NewJournalEntriesTable6";

function NewJournalEntriesDesktop2() {
  return (
    <div className="nje-page nje-page-variant-two">
      {/* Hero Section */}
      <section className="nje-hero">
        <div className="nje-hero-overlay" />
        <div className="nje-hero-card">
          <span className="nje-hero-badge">פקודות יומן מלאות</span>
          <h1 className="nje-hero-title">סקירת הפקודות לפי קטגוריות</h1>
          <p className="nje-hero-description">
            כל הטבלה שלפניכם מרכזת את הפקודות המרכזיות לפי קטגוריות.
            הסכומים הם ערכי ברירת מחדל, יחד עם פיצול חובה/זכות כדי לאפשר בדיקה מהירה.
          </p>
        </div>
      </section>



      {/* Income Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-income" aria-hidden="true">📘</span>
              <h2>הכנסות</h2>
            </div>
            <p>פירוט ההכנסות ומע"מ עסקאות</p>
          </div>
          <span className="nje-dot nje-dot-green" />
        </header>

        <NewJournalEntriesTable1 />
      </section>

      {/* Expenses Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-expenses" aria-hidden="true">📕</span>
              <h2>הוצאות</h2>
            </div>
            <p>פירוט ההוצאות ומע"מ תשומות.</p>
          </div>
          <span className="nje-dot nje-dot-red" />
        </header>

        <NewJournalEntriesTable2 />
      </section>


      {/* Dividend Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-dividend" aria-hidden="true">💰</span>
              <h2>דיבידנד</h2>
            </div>
            <p>ניהול רישום דיבידנד לפי סוג בעל מניות</p>
          </div>
          <span className="nje-dot nje-dot-orange" />
        </header>

        <NewJournalEntriesTable3 />
      </section>

      {/* Import Invoice Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-import" aria-hidden="true">📊</span>
              <h2>חשבונית יבוא</h2>
            </div>
            <p>רישום תנועות יומן עבור רשימון יבוא</p>
          </div>
          <span className="nje-dot nje-dot-purple" />
        </header>

        <NewJournalEntriesTable4 />
      </section>

      {/* Inventory Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-inventory" aria-hidden="true">📦</span>
              <h2>מלאי וסיכומים</h2>
            </div>
            <p>פירוט רישומי רכישת מלאי והוצאות נלוות</p>
          </div>
          <span className="nje-dot nje-dot-brown" />
        </header>

        <NewJournalEntriesTable5 />
      </section>

      {/* Self Invoice Section */}
      <section className="nje-section">
        <header className="nje-section-header">
          <div className="nje-section-header-text">
            <div className="nje-section-title">
              <span className="nje-section-icon nje-section-icon-self" aria-hidden="true">🧾</span>
              <h2>חשבונית מס עצמית</h2>
            </div>
            <p>תיעוד פעולות החשבונית העצמית וגילום המע"מ</p>
          </div>
          <span className="nje-dot nje-dot-teal" />
        </header>

        <NewJournalEntriesTable6 />
      </section>
    </div>
  );
}

export default NewJournalEntriesDesktop2;
