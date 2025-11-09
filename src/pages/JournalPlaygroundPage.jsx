import React, { useEffect, useState } from "react";
import JournalPlaygroundDesktopFull from "../components/AccountingTools/JournalPlaygroundDesktopFull";
import JournalPlaygroundMobileFull from "../components/AccountingTools/JournalPlaygroundMobileFull";

const MOBILE_BREAKPOINT = 768;

const JournalPlaygroundPage = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <JournalPlaygroundMobileFull />
  ) : (
    <JournalPlaygroundDesktopFull />
  );
};

export default JournalPlaygroundPage;

