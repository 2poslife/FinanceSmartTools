import React, { useState } from "react";
import "./NewJournalEntriesTable6.css";

const numberFormatter = new Intl.NumberFormat("he-IL");

const formatNumber = (value) =>
  numberFormatter.format(Math.round(Math.max(value, 0)));

const formatCurrency = (value) => `₪ ${formatNumber(value)}`;

const parseAmount = (value) => {
  const numeric = parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

function NewJournalEntriesTable6() {
  const [selfInvoiceValue, setSelfInvoiceValue] = useState("5000");

  const amount = parseAmount(selfInvoiceValue);
  const net = amount / 1.18;
  const vat = amount - net;

  return (
    <div className="nje-table6">
      <div className="nje-table6-row nje-table6-row-head">
        <span>סוג הפקודה</span>
        <span>ערך</span>
        <span>חובה</span>
        <span></span>
        <span>זכות</span>
        <span></span>
      </div>

      <div className="nje-table6-row">
        {/* Description */}
        <span>רישום תנועות יומן עבור חשבונית מס עצמית</span>

        {/* Input */}
        <span className="nje-table6-input-cell">
          <input
            type="number"
            value={selfInvoiceValue}
            onChange={(event) => setSelfInvoiceValue(event.target.value)}
            className="nje-table6-input"
          />
        </span>

        {/* חובה (Debit side) */}
        <span className="nje-table6-two-line">
          <span>לקוח כרטיס חשבון של העסק עצמו</span>
          <br />
          <span>כרטיס חשבון הוצאה</span>
          <br />
          <span>מע״מ תשומות</span>
          <br />
          <span>כרטיס ביטול הכנסות מחשבונית עצמית</span>
        </span>

        <span className="nje-table6-two-line">
          <span className="nje-table6-input-like">{formatCurrency(amount)}</span>
          <br />
          <span className="nje-table6-input-like">{formatCurrency(net)}</span>
          <br />
          <span className="nje-table6-input-like">{formatCurrency(vat)}</span>
          <br />
          <span className="nje-table6-input-like">{formatCurrency(net)}</span>
        </span>

        {/* זכות (Credit side) */}
        <span className="nje-table6-two-line">
          <span>
            הכנסה המוגדרת כסוג חשבון "הכנסות חייבות מע״מ ופטורות ממקדמות"
          </span>
          <br />
          <span>מע״מ עסקאות</span>
          <br />
          <span>ספק כרטיס חשבון של העסק עצמו</span>
          <br />
          <span>ספק כרטיס חשבון של העסק עצמו</span>
        </span>

        <span className="nje-table6-two-line">
        <span className="nje-table6-input-like">{formatCurrency(net)}</span>
        <br />
            <span className="nje-table6-input-like">{formatCurrency(amount-net)}</span> 
          <br />
          <span className="nje-table6-input-like">{formatCurrency(amount)}</span>
          <br />
          <span className="nje-table6-input-like">{formatCurrency(net)}</span>
        </span>
      </div>
    </div>
  );
}

export default NewJournalEntriesTable6;
