import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import JobContext from "../Contexts/JobContext";

const JobDetails = () => {
  const { jobs } = useContext(JobContext);
  const { id } = useParams();
  const job = jobs.find((job) => job.id.toString() === id);

  if (!job) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold">Job not found</h1>

        <p className="mt-2 text-gray-600">
          Please go back to the Jobs page and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-blue-600">{job.name}</h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {job.company?.name || "Not Available"}
          </p>

          <p>
            <span className="font-semibold">Locations:</span>{" "}
            {job.locations.map((location) => location.name).join(", ")}
          </p>

          <p>
            <span className="font-semibold">Levels:</span>{" "}
            {job.levels.map((level) => level.name).join(", ")}
          </p>

          <p>
            <span className="font-semibold">Categories:</span>{" "}
            {job.categories.map((category) => category.name).join(", ")}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Job Description</h2>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: job.contents,
            }}
          />
        </div>

        <a
          href={job.refs.landing_page}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
