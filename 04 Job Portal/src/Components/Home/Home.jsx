import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-6">
      <div className="max-w-3xl text-center text-white">
        <h1 className="mb-6 text-5xl font-bold">Find Your Dream Job</h1>
        <p className="mb-8 text-lg text-blue-100">
          Discover thousands of opportunities from top companies around the
          world.
        </p>
        <Link
          to="/jobs"
          className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-md transition hover:bg-gray-100"
        >
          Explore Jobs
        </Link>
      </div>
    </section>
  );
};

export default Home;
