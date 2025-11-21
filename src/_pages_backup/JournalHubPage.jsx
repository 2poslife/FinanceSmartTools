import React, { useEffect } from "react";
import JournalHub from "../components/AccountingTools/JournalHub";

const JournalHubPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <JournalHub />;
};

export default JournalHubPage;

