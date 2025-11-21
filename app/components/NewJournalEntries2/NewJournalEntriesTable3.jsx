import React, { useState } from "react";
import "./NewJournalEntriesTable3.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

function NewJournalEntriesTable3() {
  const [dividendValues, setDividendValues] = useState({
    significant: "4000",
    regular: "3000",
    payment: "5000",
  });

  const handleChange = (key) => (event) => {
    setDividendValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  // Helper for computing two-part split
  const getSplit = (value, percentA, percentB) => {
    const amount = parseAmount(value);
    return {
      partA: amount * percentA,
      partB: amount * percentB,
    };
  };

  // --- Split calculations for each row ---
  const significantSplit = getSplit(dividendValues.significant, 0.7, 0.3); // row 1
  const regularSplit = getSplit(dividendValues.regular, 0.75, 0.25); // row 2
  const paymentSplit = getSplit(dividendValues.payment, 0.7, 0.3); // row 3 - stay same as before

  return (
    <div className="nje-table3">
      <div className="nje-table3-row nje-table3-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      {/* Row 1 */}
      <div className="nje-table3-row">
        <span>רישום חלוקת דיבידנד (בעל מניות מהותי)</span>

        <span className="nje-table3-input-cell">
          <input
            type="number"
            value={dividendValues.significant}
            onChange={handleChange("significant")}
            className="nje-table3-input"
          />
        </span>

        <span className="nje-table3-two-line">
          <span>עודפים</span>
        </span>

        <span className="nje-table3-two-line">
          <span>{formatCurrency(parseAmount(dividendValues.significant))}</span>
        </span>

        <span className="nje-table3-two-line">
          <span>בעל מניות</span>
          <span>מס הכנסה ניכויים</span>
        </span>

        <span className="nje-table3-two-line">
          <span>{formatCurrency(significantSplit.partA)}</span>
          <span>{formatCurrency(significantSplit.partB)}</span>
        </span>
      </div>

      {/* Row 2 */}
      <div className="nje-table3-row">
        <span>רישום חלוקת דיבידנד (בעל מניות רגיל)</span>

        <span className="nje-table3-input-cell">
          <input
            type="number"
            value={dividendValues.regular}
            onChange={handleChange("regular")}
            className="nje-table3-input"
          />
        </span>

        <span className="nje-table3-two-line">
          <span>עודפים</span>
        </span>

        <span className="nje-table3-two-line">
          <span>{formatCurrency(parseAmount(dividendValues.regular))}</span>
        </span>

        <span className="nje-table3-two-line">
          <span>בעל מניות</span>
          <span>מס הכנסה ניכויים</span>
        </span>

        <span className="nje-table3-two-line">
          <span>{formatCurrency(regularSplit.partA)}</span>
          <span>{formatCurrency(regularSplit.partB)}</span>
        </span>
      </div>

      {/* Row 3 */}
      <div className="nje-table3-row">
        <span>רישום תשלום דיבידנד</span>

        <span className="nje-table3-input-cell">
          <input
            type="number"
            value={dividendValues.payment}
            onChange={handleChange("payment")}
            className="nje-table3-input"
          />
        </span>

        <span className="nje-table3-two-line">
          <span>מס הכנסה - ניכויים</span>
          <span>בעל מניות </span>
        </span>

        <span className="nje-table3-two-line">
          <span>{formatCurrency(paymentSplit.partA)}</span>
          <span>{formatCurrency(paymentSplit.partB)}</span>
        </span>

        <span className="nje-table3-two-line">
          <span>צורת התשלום - בנק</span>
        </span>

        <span className="nje-table3-inline-value">
          {formatCurrency(parseAmount(dividendValues.payment))}
        </span>
      </div>
    </div>
  );
}

export default NewJournalEntriesTable3;
