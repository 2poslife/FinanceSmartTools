import React from "react";
import CalculatorsIntro from "./CalculatorsIntro";
import CalculatorsGrid from "./CalculatorsGrid";
import "../../styles/CalculatorsPage/CalculatorsDesktop.css";

const CalculatorsDesktop = () => {
    return (
        <div className="calculators-page" dir="rtl">
            <CalculatorsIntro />
            <CalculatorsGrid />
        </div>
    );
};

export default CalculatorsDesktop;
