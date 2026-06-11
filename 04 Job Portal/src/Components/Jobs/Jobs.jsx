import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import JobCard from "../JobCard/JobCard";
import JobContext from "../Contexts/JobContext";

const Jobs = () => {
  const { jobs, setJobs } = useContext(JobContext);
  const jobsData = useLoaderData();
  useEffect(() => {
    setJobs(jobsData);
  }, [jobsData, setJobs]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">Available Jobs</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobsData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
