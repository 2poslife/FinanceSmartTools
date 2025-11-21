'use client'

import React, { useState, useEffect } from "react"
import "../../styles/Layout/CookieConsent.css"

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    // For testing: you can clear localStorage by running: localStorage.removeItem("cookie_consent") in browser console
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        setShowBanner(true)
      }, 500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <p className="cookie-consent-text">
          <strong>الخصوصية مهمة بالنسبة لنا</strong>
          <br />
          لمعرفتك، يستخدم هذا الموقع "ملفات تعريف الارتباط" (cookies) وأدوات مشابهة أخرى لتوفير تجربة تصفح أفضل، ومحتوى مخصص، وإجراء تحليلات إحصائية. لمزيد من المعلومات، يمكنك الاطلاع على{" "}
          <a href="/privacy-policy" className="cookie-consent-link" target="_blank" rel="noopener noreferrer">
            سياسة الخصوصية الخاصة بنا
          </a>
        </p>
        <button className="cookie-consent-button" onClick={handleAccept}>
          قرأت وفهمت
        </button>
      </div>
    </div>
  )
}

export default CookieConsent

