'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import "../../src/styles/Auth/SigninForm.css"
import { jwtDecode } from "jwt-decode"

export default function SigninForm() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      console.log("Attempting login with:", { username })
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password }),
          signal: controller.signal
        }
      )

      clearTimeout(timeoutId)

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = "اسم المستخدم أو كلمة المرور غير صحيحة"
        try {
          const errorData = await response.json()
          errorMessage = errorData.detail || errorData.message || errorMessage
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()

      if (!data.access_token) {
        throw new Error("لم يتم استلام رمز الدخول من الخادم")
      }

      // Save token
      localStorage.setItem("access_token", data.access_token)

      // Decode role from token
      const decoded = jwtDecode(data.access_token)

      // Optional: check expiry
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى")
      }

      // Trigger auth change event to update header state
      window.dispatchEvent(new Event('authChange'));
      
      // Redirect based on role
      if (decoded.role === "admin") {
        router.push("/AdminPage")
      } else {
        router.push("/CalculatorsPage")
      }
    } catch (err) {
      // Handle network errors specifically
      if (err.name === 'AbortError') {
        setError("انتهت مهلة الاتصال. الخادم يستغرق وقتاً طويلاً للاستجابة. يرجى المحاولة مرة أخرى.")
      } else if (err.name === 'TypeError' && (err.message.includes('fetch') || err.message.includes('Failed to fetch'))) {
        setError("فشل الاتصال بالخادم. قد يكون الخادم غير متاح حالياً. يرجى المحاولة مرة أخرى بعد قليل.")
      } else if (err.message) {
        setError(err.message)
      } else {
        setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.")
      }
      console.error("Login error:", err)
      console.error("Error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack
      })
    } finally {
      setLoading(false)
    }
  }

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
          <img src="https://d3egla0dyi6qxn.cloudfront.net/public/logo.png" alt="Logo" className="logo-image" />
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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "دخول"}
          </button>

          {/* Back button */}
          <button
            type="button"
            className="signin-back-button"
            onClick={() => router.push("/")}
          >
            ⬅ العودة
          </button>
        </form>
      </div>
    </div>
  )
}

