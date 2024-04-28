import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import type { FC } from "react";
import { HomePage } from "./pages/home";
import JobDetails from "./pages/job-detail"; // Corrected import statement
import { NotfoundPage } from "./pages/not-found";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/job-posting/",
      element: <HomePage />,
      errorElement: <NotfoundPage />,
    },
    {
      path: "/job-posting/:jobId",
      element: <JobDetails />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
