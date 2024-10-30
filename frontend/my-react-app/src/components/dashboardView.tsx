import "./dashboardView.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="button-container">
        <button
          className="dashboard-button"
          style={{ backgroundImage: "url('/images/create-page.jpg')" }}
          onClick={() => console.log("Create New Blank Page")}
        >
          <span>Create New Blank Page</span>
        </button>

        <button
          className="dashboard-button"
          style={{ backgroundImage: "url('/images/edit-document.jpg')" }}
          onClick={() => console.log("Edit Existing Document")}
        >
          <span>Edit Existing Document</span>
        </button>

        <button
          className="dashboard-button"
          style={{ backgroundImage: "url('/images/manage-versions.jpg')" }}
          onClick={() => console.log("Manage Versions")}
        >
          <span>Manage Versions</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
