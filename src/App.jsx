import React from "react";
import { jwtDecode } from "jwt-decode";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import SigninForm from "./components/Auth/SigninForm";
import UserPage from "./pages/UserPage";
import AdminPage from "./components/Admin/AdminPage";
import AdminConsts from "./components/Admin/AdminConsts";
import CalculatorsPage from "./pages/CalculatorsPage";
import EmployeeCostNoPension from "./components/Calculators/EmployeeCostNoPension";
import EmployeeCostWithPension from "./components/Calculators/EmployeeCostWithPension";
import MicroSelfEmployedCalculator from "./components/Calculators/MicroSelfEmployedCalculator";
import MicroSelfEmployedSalariedCalculator from "./components/Calculators/MicroSelfEmployedSalariedCalculator";
import SelfEmployedCost from "./components/Calculators/SelfEmployedCost";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./components/ArticlesPage/ArticlesPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import './theme.css'

import IncomeTaxWithPoints from "./components/Calculators/IncomeTaxWithPoints";
// Headers & Footer
import Header from "./components/Layout/Header";
import AdminHeader from "./components/Layout/AdminHeader";
import Footer from "./components/Layout/Footer";

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
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />

        {/* User routes */}
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/CalculatorsPage" element={<CalculatorsPage />} />

        {/* Admin routes */}
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminConsts" element={<AdminConsts />} />

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
