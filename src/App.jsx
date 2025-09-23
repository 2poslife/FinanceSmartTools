import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home3 from "./pages/Home3";
import SigninForm from "./pages/SigninForm";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import AdminConsts from "./pages/AdminConsts";
import CalculatorsPage from "./pages/CalculatorsPage";

import EmployeeCostNoPension from "./pages/EmployeeCostNoPension";
import EmployeeCostWithPension from "./pages/EmployeeCostWithPension";
import MicroSelfEmployedCalculator from "./pages/MicroSelfEmployedCalculator";
import MicroSelfEmployedSalariedCalculator from "./pages/MicroSelfEmployedSalariedCalculator";
import SelfEmployedCost from "./pages/SelfEmployedCost";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/SigninForm" element={<SigninForm />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/AdminConsts" element={<AdminConsts />} />
        <Route path="/CalculatorsPage" element={<CalculatorsPage />} />


        <Route path="/simulators/employee-cost-no-pension" element={<EmployeeCostNoPension />} />
        <Route path="/simulators/employee-cost-with-pension" element={<EmployeeCostWithPension />} />
        <Route path="simulators/self-employed" element={<SelfEmployedCost />} />
        <Route path="simulators/micro-self-employed" element={<MicroSelfEmployedCalculator />} />
        <Route path="simulators/micro-self-employed-salaried" element={<MicroSelfEmployedSalariedCalculator />} />



      </Routes>
    </Router>
  );
}

export default App;