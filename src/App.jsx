import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CalculatorsPage from "./pages/CalculatorsPage";

// Auth
import SigninForm from "./components/Auth/SigninForm";

// Admin
import AdminPage from "./components/Admin/AdminPage";
import AdminConsts from "./components/Admin/AdminConsts";

// Calculators
import EmployeeCostNoPension from "./components/Calculators/EmployeeCostNoPension";
import EmployeeCostWithPension from "./components/Calculators/EmployeeCostWithPension";
import SelfEmployedCost from "./components/Calculators/SelfEmployedCost";
import MicroSelfEmployedCalculator from "./components/Calculators/MicroSelfEmployedCalculator";
import MicroSelfEmployedSalariedCalculator from "./components/Calculators/MicroSelfEmployedSalariedCalculator";
import IncomeTaxWithPoints from "./components/Calculators/IncomeTaxWithPoints";

// Layout
import Header from "./components/Layout/Header";
import MobileHeader from "./components/Layout/MobileHeader";
import AdminHeader from "./components/Layout/AdminHeader";
import Footer from "./components/Layout/Footer";

// Styles
import "./theme.css";

// Custom hook for authentication
const useAuth = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return { isAuthenticated: false, role: null };

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("access_token");
      return { isAuthenticated: false, role: null };
    }

    return { isAuthenticated: true, role: decoded.role };
  } catch (err) {
    console.error("❌ Invalid token:", err);
    localStorage.removeItem("access_token");
    return { isAuthenticated: false, role: null };
  }
};

// Custom hook for responsive design
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// Layout component
function Layout() {
  const { isAuthenticated, role } = useAuth();
  const isMobile = useResponsive();

  // Determine which header to show
  const renderHeader = () => {
    if (role === "admin") return <AdminHeader />;
    if (isMobile && role !== "admin") return <MobileHeader />;
    return <Header />;
  };

  return (
    <>
      {renderHeader()}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/SigninForm" element={<SigninForm />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/CalculatorsPage" element={<CalculatorsPage />} />

        {/* Calculator Routes */}
        <Route
          path="/simulators/employee-cost-no-pension"
          element={<EmployeeCostNoPension />}
        />
        <Route
          path="/simulators/employee-cost-with-pension"
          element={<EmployeeCostWithPension />}
        />
        <Route
          path="/simulators/self-employed"
          element={<SelfEmployedCost />}
        />
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

        {/* User Routes */}

        {/* Admin Routes */}
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminConsts" element={<AdminConsts />} />
      </Routes>

      <Footer />
    </>
  );
}

// Main App Component
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
