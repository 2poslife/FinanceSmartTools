import React, { useState } from "react";
import "./NewJournalEntriesTable2.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const splitVat = (raw) => {
  const amount = parseAmount(raw);
  const net = amount / 1.18;
  const vat = amount - net;
  return { net, vat, total: amount };
};

function NewJournalEntriesTable2() {
  const [expenseValues, setExpenseValues] = useState({
    vatFull: "3200",
    annual: "4500",
    taxes: "4500",
  });

  const handleChange = (key) => (event) => {
    setExpenseValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const vatFull = splitVat(expenseValues.vatFull);
  const annualAmount = parseAmount(expenseValues.annual);
  const taxesAmount = parseAmount(expenseValues.taxes);

  return (
    <div className="nje-table2 nje-table2-6cols">
      <div className="nje-table2-row nje-table2-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      <div className="nje-table2-row">
        <span>רישום הוצאה מע"מ מלא</span>

        <span className="nje-table2-input-cell">
          <input
            type="number"
            value={expenseValues.vatFull}
            onChange={handleChange("vatFull")}
            className="nje-table2-input"
          />
        </span>

        <span>לפי סוג ההוצאה</span>

        <span className="nje-table2-two-line">
          <span className="nje-table2-input-like">
            {formatCurrency(vatFull.net)}
          </span>
          <span className="nje-table2-input-like">
            {formatCurrency(vatFull.vat)}
          </span>
        </span>

        <span>ספק</span>

        <span className="nje-table2-input-like">
          {formatCurrency(vatFull.total)}
        </span>
      </div>

      <div className="nje-table2-row">
        <span>רישום הוצאה לדוח השנתי (ארנונה, ביטוחים..)</span>

        <span className="nje-table2-input-cell">
          <input
            type="number"
            value={expenseValues.annual}
            onChange={handleChange("annual")}
            className="nje-table2-input"
          />
        </span>

        <span>בוחרים כרטיס</span>

        <span className="nje-table2-input-like">
          {formatCurrency(annualAmount)}
        </span>

        <span>ספק</span>

        <span className="nje-table2-input-like">
          {formatCurrency(annualAmount)}
        </span>
      </div>

      <div className="nje-table2-row">
        <span>רישום תשלומי מיסים שוטפים</span>

        <span className="nje-table2-input-cell">
          <input
            type="number"
            value={expenseValues.taxes}
            onChange={handleChange("taxes")}
            className="nje-table2-input"
          />
        </span>

        <span>מקדמות מס הכנסה</span>

        <span className="nje-table2-input-like">
          {formatCurrency(taxesAmount)}
        </span>

        <span>פקיד השומה</span>

        <span className="nje-table2-input-like">
          {formatCurrency(taxesAmount)}
        </span>
      </div>
    </div>
  );
}

export default NewJournalEntriesTable2;
