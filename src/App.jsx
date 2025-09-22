import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home3 from "./pages/Home3";
import SigninForm from "./pages/SigninForm";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/SigninForm" element={<SigninForm />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/UserPage" element={<UserPage />} />


      </Routes>
    </Router>
  );
}

export default App;