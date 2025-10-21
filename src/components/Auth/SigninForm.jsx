import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth/SigninForm.css";
import { jwtDecode } from "jwt-decode";

const SigninForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://financesmarttools-backend.onrender.com/user/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "اسم المستخدم أو كلمة المرور غير صحيحة");
      }

      // Save token
      localStorage.setItem("access_token", data.access_token);

      // Decode role from token
      const decoded = jwtDecode(data.access_token);

      // Optional: check expiry
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى");
      }

      // Redirect based on role
      if (decoded.role === "admin") {
        navigate("/AdminPage");
      } else {
        navigate("/CalculatorsPage");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* SVG finance background */}
      <div className="login-bg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#b29053"
            fillOpacity="0.2"
            stroke="#000000"
            strokeWidth="2"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,208C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="info-message" dir="rtl">
        <h3>مرحبًا بك في منصّة الأدوات والحاسبات الذكية.</h3>
        <p>
          سجّل دخولك للوصول إلى جميع الأدوات والميزات المتقدمة، يرجى تسجيل الدخول باستخدام بياناتك المسجلة
        </p>
      </div>

      <div className="login-box">
        <div className="login-logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <h2>تسجيل الدخول</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            دخول
          </button>

          {/* Back button */}
          <button
            type="button"
            className="signin-back-button"
            onClick={() => navigate("/")}
          >
            ⬅ العودة
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
