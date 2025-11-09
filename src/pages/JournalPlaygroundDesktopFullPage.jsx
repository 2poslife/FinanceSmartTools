import React, { useEffect } from "react";

const JournalPlaygroundDesktopFullPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <JournalPlaygroundDesktopFull />;
};

export default JournalPlaygroundDesktopFullPage;
