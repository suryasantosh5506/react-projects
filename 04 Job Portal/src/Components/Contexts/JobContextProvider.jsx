import React, { useEffect, useState } from "react";
import JobContext from "./JobContext";

const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState(
    () => JSON.parse(localStorage.getItem("savedJobs")) || [],
  );
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  return (
    <JobContext.Provider
      value={{ jobs, setJobs, savedJobs, setSavedJobs, darkMode, setDarkMode }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContextProvider;
