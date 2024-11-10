import { useNavigate } from "react-router-dom";
import "./dashboardView.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <div className="button-container">
        <button
          className="dashboard-button"
          style={{ backgroundImage: "url('./public/images/create.webp')" }}
          onClick={() => navigate("/createView")}
        >
          <span>Create New Blank Page</span>
        </button>
        <button
          className="dashboard-button"
          style={{ backgroundImage: "url('./public/images/1.jpg')" }}
          onClick={() => navigate("/editView")}
        >
          <span>Edit Existing Document</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
