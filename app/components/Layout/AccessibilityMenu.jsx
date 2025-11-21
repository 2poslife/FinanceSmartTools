'use client'

import React, { useState, useEffect } from "react"
import { X, Settings, Type, Palette, Eye, Highlighter, MoreHorizontal } from "lucide-react"
import "../../styles/Layout/AccessibilityMenu.css"

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [textSize, setTextSize] = useState(100) // percentage
  const [highContrast, setHighContrast] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [showFocus, setShowFocus] = useState(true)

  useEffect(() => {
    // Apply text size
    document.documentElement.style.fontSize = `${textSize}%`
    
    // Apply high contrast
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }

    // Apply link highlighting
    if (highlightLinks) {
      document.body.classList.add('highlight-links')
    } else {
      document.body.classList.remove('highlight-links')
    }

    // Apply focus indicators
    if (showFocus) {
      document.body.classList.add('show-focus')
    } else {
      document.body.classList.remove('show-focus')
    }
  }, [textSize, highContrast, highlightLinks, showFocus])

  const resetSettings = () => {
    setTextSize(100)
    setHighContrast(false)
    setHighlightLinks(false)
    setShowFocus(true)
  }

  return (
    <>
      {/* Accessibility Button */}
      <button 
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="قائمة إعدادات إمكانية الوصول"
      >
        <div className="accessibility-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <circle cx="12" cy="12" r="1.5"/>
          </svg>
        </div>
        <span>נגישות</span>
      </button>

      {/* Accessibility Menu Panel */}
      {isOpen && (
        <div className="accessibility-menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="accessibility-menu" onClick={(e) => e.stopPropagation()}>
            <div className="accessibility-menu-header">
              <h2>إعدادات إمكانية الوصول</h2>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق"
              >
                <X size={24} />
              </button>
            </div>

            <div className="accessibility-menu-content">
              {/* Text Size */}
              <div className="accessibility-item">
                <div className="item-header">
                  <Type className="item-icon" />
                  <h3>حجم النص</h3>
                </div>
                <div className="item-controls">
                  <button 
                    className="size-btn"
                    onClick={() => setTextSize(Math.max(50, textSize - 10))}
                    aria-label="تقليل حجم النص"
                  >
                    A-
                  </button>
                  <span className="size-display">{textSize}%</span>
                  <button 
                    className="size-btn"
                    onClick={() => setTextSize(Math.min(200, textSize + 10))}
                    aria-label="زيادة حجم النص"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div className="accessibility-item">
                <div className="item-header">
                  <Palette className="item-icon" />
                  <h3>الألوان</h3>
                </div>
                <div className="item-controls">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">تباين عالي</span>
                  </label>
                </div>
              </div>

              {/* Display */}
              <div className="accessibility-item">
                <div className="item-header">
                  <Eye className="item-icon" />
                  <h3>العرض</h3>
                </div>
                <div className="item-controls">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={showFocus}
                      onChange={(e) => setShowFocus(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">إظهار مؤشر التركيز</span>
                  </label>
                </div>
              </div>

              {/* Highlight */}
              <div className="accessibility-item">
                <div className="item-header">
                  <Highlighter className="item-icon" />
                  <h3>التأكيد</h3>
                </div>
                <div className="item-controls">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={highlightLinks}
                      onChange={(e) => setHighlightLinks(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">تمييز الروابط</span>
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <div className="accessibility-item">
                <button className="reset-button" onClick={resetSettings}>
                  <Settings className="item-icon" />
                  إعادة تعيين الإعدادات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccessibilityMenu

