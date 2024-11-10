import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/logInView";
import Dashboard from "./components/dashboardView";
import CreateView from "./components/createView";
import EditView from "./components/editView";
import ProjectDetails from "./components/projectDetailsView";
import ManageVersions from "./components/manageVersionsView";
import Editing from "./components/editingView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createView" element={<CreateView />} />
        <Route path="/editView" element={<EditView />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />

        <Route
          path="/manageVersions/:documentId"
          element={<ManageVersions />}
        />

        <Route path="/editing/:documentId" element={<Editing />} />
      </Routes>
    </Router>
  );
}

export default App;
