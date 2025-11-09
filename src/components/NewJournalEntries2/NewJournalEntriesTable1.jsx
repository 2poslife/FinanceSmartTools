import React, { useState } from "react";
import "./NewJournalEntriesTable1.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const computeBaseValue = (raw) => {
  const amount = parseAmount(raw);
  return amount / 1.18;
};

function NewJournalEntriesTable1() {
  const [incomeValues, setIncomeValues] = useState({
    taxable: "5000",
    exempt: "5000",
  });

  const handleIncomeChange = (key) => (event) => {
    setIncomeValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const taxableBase = computeBaseValue(incomeValues.taxable);
  const exemptBase = computeBaseValue(incomeValues.exempt);

  return (
    <div className="nje-table1 nje-table1-6cols">
      <div className="nje-table1-row nje-table1-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      <div className="nje-table1-row">
        <span>רישום הכנסה חייבת מע"מ</span>

        <span className="nje-table1-input-cell">
          <input
            type="number"
            value={incomeValues.taxable}
            onChange={handleIncomeChange("taxable")}
            className="nje-table1-input"
          />
        </span>

        <span>לקוח</span>
        <span className="nje-table1-inline-value">{incomeValues.taxable}</span>
        <span className="nje-table1-two-line">
          <span>הכנסות</span>
          <span>מע"מ עסקאות</span>
        </span>
        <span className="nje-table1-two-line2">
          <span>{formatCurrency(taxableBase)}</span>
          <span>
            {formatCurrency(parseAmount(incomeValues.taxable) - taxableBase)}
          </span>
        </span>
      </div>

      <div className="nje-table1-row">
        <span>רישום הכנסה פטורה מע"מ</span>

        <span className="nje-table1-input-cell">
          <input
            type="number"
            value={incomeValues.exempt}
            onChange={handleIncomeChange("exempt")}
            className="nje-table1-input"
          />
        </span>

        <span>לקוח</span>
        <span className="nje-table1-inline-value">{incomeValues.exempt}</span>
        <span>הכנסות פטורות</span>
        <span className="nje-table1-inline-value">{incomeValues.exempt}</span>
      </div>
    </div>
  );
}

export default NewJournalEntriesTable1;
