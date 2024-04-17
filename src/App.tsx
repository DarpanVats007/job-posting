import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import type { FC } from "react";
import HomePage from "./pages/home";
import JobDetails from "./pages/job-detail"; // Corrected import statement

const App: FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:jobId" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
