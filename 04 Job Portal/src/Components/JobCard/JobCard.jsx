import React, { useContext } from "react";
import { Link } from "react-router-dom";
import JobContext from "../Contexts/JobContext";

const JobCard = ({ job }) => {
  const { savedJobs, setSavedJobs } = useContext(JobContext);

  const handleSave = () => {
    const exist = savedJobs.some((savedjob) => savedjob.id === job.id);

    if (!exist) setSavedJobs([...savedJobs, job]);
    else {
      setSavedJobs((prev) => prev.filter((savedJob) => savedJob.id !== job.id));
    }
  };

  const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-xl dark:bg-slate-800">
      <h2 className="text-xl font-bold text-blue-600">{job.name}</h2>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Company:</span>{" "}
        {job.company?.name || "Not Available"}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Locations:</span>{" "}
        {job.locations.map((location) => location.name).join(", ")}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Levels:</span>{" "}
        {job.levels.map((level) => level.name).join(", ")}
      </p>

      <div className="mt-6 flex justify-between">
        <a
          href={job.refs.landing_page}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Apply
        </a>

        <button
          onClick={handleSave}
          className={`rounded-md px-4 py-2 text-white ${
            isSaved
              ? "cursor-not-allowed bg-gray-500"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {isSaved ? "Remove" : "Save Job"}
        </button>

        <Link
          to={`/jobs/${job.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
