'use client'

import React from "react";
import "../../styles/Calculators/CustomAlert.css";

const CustomAlert = ({ message, onClose, title = "הודעה" }) => {
    return (
        <div className="custom-alert-overlay" onClick={onClose}>
            <div className="custom-alert-dialog" onClick={(e) => e.stopPropagation()} dir="rtl">
                <div className="custom-alert-title">{title}</div>
                <div className="custom-alert-message">{message}</div>
                <button className="custom-alert-button" onClick={onClose}>
                    אישור
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;

