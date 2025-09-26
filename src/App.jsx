import React from "react";
import { jwtDecode } from "jwt-decode";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
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
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import AdminPage2 from "./pages/AdminPage2";
import IncomeTaxWithPoints from "./pages/IncomeTaxWithPoints";
// Headers & Footer
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";

// ✅ Layout wrapper to switch headers
function Layout() {
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }

  return (
    <>
      {token ? (
        role === "admin" ? <AdminHeader /> : <Header />
      ) : (
        <Header />
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/SigninForm" element={<SigninForm />} />
        <Route path="/AboutUs" element={<AboutUs />} />

        {/* User routes */}
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/CalculatorsPage" element={<CalculatorsPage />} />

        {/* Admin routes */}
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminConsts" element={<AdminConsts />} />
        <Route path="/AdminPage2" element={<AdminPage2 />} />

        {/* Simulators */}
        <Route
          path="/simulators/employee-cost-no-pension"
          element={<EmployeeCostNoPension />}
        />
        <Route
          path="/simulators/employee-cost-with-pension"
          element={<EmployeeCostWithPension />}
        />
        <Route path="/simulators/self-employed" element={<SelfEmployedCost />} />
        <Route
          path="/simulators/micro-self-employed"
          element={<MicroSelfEmployedCalculator />}
        />
        <Route
          path="/simulators/micro-self-employed-salaried"
          element={<MicroSelfEmployedSalariedCalculator />}
        />



        <Route
          path="/simulators/IncomeTaxWithPoints"
          element={<IncomeTaxWithPoints />}
        />
      </Routes>

      {/* ✅ Keep Footer from your branch */}
      <Footer />
    </>
  );
}

// ✅ App wrapper with Router
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
