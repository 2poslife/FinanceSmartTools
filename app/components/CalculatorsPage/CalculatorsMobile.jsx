import React from "react";
import CalculatorsIntroMobile from "./CalculatorsIntroMobile";
import CalculatorsGridMobile from "./CalculatorsGridMobile";
import "../../styles/CalculatorsPage/CalculatorsMobile.css";

const CalculatorsMobile = () => {
    return (
        <div className="calculators-page" dir="rtl">
            <CalculatorsIntroMobile />
            <CalculatorsGridMobile />
        </div>
    );
};

export default CalculatorsMobile;
