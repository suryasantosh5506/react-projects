import React, { useContext } from "react";
import JobContext from "../Contexts/JobContext";
import JobCard from "../JobCard/JobCard";

const SavedJobs = () => {
  const { savedJobs } = useContext(JobContext);

  if (savedJobs.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-800">No Saved Jobs</h1>

        <p className="mt-4 text-center text-gray-600">
          You haven't saved any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">Saved Jobs</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {savedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
