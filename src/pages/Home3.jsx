// Header.jsx (Tailwind)
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Phone } from "lucide-react";

export default function Home3({ navigationItems = [], createPageUrl = (slug) => `/${slug.toLowerCase()}` }) {
    const location = useLocation();

    return (
        <header className="relative bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
            {/* light blue strip under the header (like the screenshot) */}
            <div className="absolute inset-x-0 -bottom-[10px] h-3 bg-blue-50"></div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                {/* RTL row: brand on the right, nav center, button on the left */}
                <div className="flex items-center justify-between" dir="rtl">
                    {/* Logo / Brand (right) */}
                    <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200/60">
                            <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-xl font-bold text-slate-800">مكتب المحاسبة المتقدم</h1>
                            <p className="text-[13px] text-slate-500 mt-0.5">دورات محاسبية احترافية</p>
                        </div>
                    </Link>

                    {/* Navigation (center) */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigationItems.map((item) => {
                            const ActiveIcon = item.icon;
                            const isActive = location.pathname === item.url;
                            return (
                                <Link
                                    key={item.title}
                                    to={item.url}
                                    className={[
                                        "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                            : "text-slate-600 hover:text-blue-600 hover:bg-blue-50",
                                    ].join(" ")}
                                >
                                    {ActiveIcon && <ActiveIcon className="w-4 h-4" />}
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Contact Button (left) */}
                    <div className="hidden md:block">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-200/60 hover:shadow-amber-200 transition-all duration-200"
                        >
                            <Phone className="w-4 h-4" />
                            اتصل بنا
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden mt-4 flex justify-around bg-slate-50 rounded-xl p-2" dir="rtl">
                    {navigationItems.map((item) => {
                        const ActiveIcon = item.icon;
                        const isActive = location.pathname === item.url;
                        return (
                            <Link
                                key={item.title}
                                to={item.url}
                                className={[
                                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium",
                                    isActive ? "bg-blue-600 text-white" : "text-slate-600",
                                ].join(" ")}
                            >
                                {ActiveIcon && <ActiveIcon className="w-5 h-5" />}
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
