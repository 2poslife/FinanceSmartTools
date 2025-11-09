import React, { useEffect } from "react";

const JournalPlaygroundMobileFullPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <JournalPlaygroundMobileFull />;
};

export default JournalPlaygroundMobileFullPage;

