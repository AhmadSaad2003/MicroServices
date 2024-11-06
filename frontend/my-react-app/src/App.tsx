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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createView" element={<CreateView />} />
        <Route path="/editView" element={<EditView />} />
      </Routes>
    </Router>
  );
}

export default App;
