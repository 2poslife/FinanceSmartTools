import React, { useState } from "react";
import "./NewJournalEntriesTable5.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

function NewJournalEntriesTable5() {
  const [inventoryValue, setInventoryValue] = useState("15000");

  const inventoryAmount = parseAmount(inventoryValue);

  return (
    <div className="nje-table5 nje-table5-6cols">
      <div className="nje-table5-row nje-table5-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      <div className="nje-table5-row">
        <span>רישום מלאי</span>

        <span className="nje-table5-input-cell">
          <input
            type="number"
            value={inventoryValue}
            onChange={(event) => setInventoryValue(event.target.value)}
            className="nje-table5-input"
          />
        </span>

        <span className="nje-table5-two-line">
          <span>מלאי מאזני</span>
        </span>

        <span className="nje-table5-input-like">
            {formatCurrency(inventoryAmount)}
          </span>
        <span className="nje-table5-two-line">

          <span>מלאי סגירה (תוצאותי)</span>
        </span>

        <span className="nje-table5-input-like">
            {formatCurrency(inventoryAmount)}
          </span>      </div>
    </div>
  );
}

export default NewJournalEntriesTable5;
