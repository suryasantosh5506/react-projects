import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Jobs from "./Components/Jobs/Jobs.jsx";
import JobDetails from "./Components/JobDetails/JobDetails.jsx";
import SavedJobs from "./Components/SavedJobs/SavedJobs.jsx";
import JobContextProvider from "./Components/Contexts/JobContextProvider.jsx";
import JobContext from "./Components/Contexts/JobContext.js";

const loadJobDetails = async () => {
  const response = await fetch(
    "https://www.themuse.com/api/public/jobs?page=1",
  );
  const data = await response.json();
  return data.results;
};

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="jobs" element={<Jobs />} loader={loadJobDetails} />
      <Route path="jobs/:id" element={<JobDetails />} />
      <Route path="saved-jobs" element={<SavedJobs />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <JobContextProvider>
    <RouterProvider router={routes} />
  </JobContextProvider>,
);
