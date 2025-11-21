import React, { useState } from "react";
import "./NewJournalEntriesTable4.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

function NewJournalEntriesTable4() {
  const [importValue, setImportValue] = useState("10000");

  const amount = parseAmount(importValue);
  const importNet = amount / 1.18; // before VAT
  const importVat = importNet * 0.18; // VAT portion

  return (
    <div className="nje-table4 nje-table4-6cols">
      <div className="nje-table4-row nje-table4-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      <div className="nje-table4-row">
        <span>רישום תנועות יומן עבור יבוא</span>

        <span className="nje-table4-input-cell">
          <input
            type="number"
            value={importValue}
            onChange={(event) => setImportValue(event.target.value)}
            className="nje-table4-input"
          />
        </span>

        {/* חובה (Debit) */}
        <span className="nje-table4-two-line">
          <span>חשבון מע"מ תשומות יבוא</span>
          <span>הוצאות רשימון יבוא</span>
        </span>

        <span className="nje-table4-two-line">
          {/* First row: VAT */}
          <span className="nje-table4-input-like">
            {formatCurrency(importVat)}
          </span>
          {/* Second row: Net */}
          <span className="nje-table4-input-like">
            {formatCurrency(importNet)}
          </span>
        </span>

        {/* זכות (Credit) */}
        <span className="nje-table4-two-line">
          <span>עמיל המכס - ספק</span>
          <span>עמיל המכס - ספק</span>
        </span>

        <span className="nje-table4-two-line">
          {/* First row: VAT */}
          <span className="nje-table4-input-like">
            {formatCurrency(importVat)}
          </span>
          {/* Second row: Net */}
          <span className="nje-table4-input-like">
            {formatCurrency(importNet)}
          </span>
        </span>
      </div>
    </div>
  );
}

export default NewJournalEntriesTable4;
