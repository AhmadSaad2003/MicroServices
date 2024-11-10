import React, { useEffect, useState } from "react";
import { getAll } from "../services/getDocumentsService";
import { Project } from "../interfaces/project";
import "./editView.css";
import { useNavigate } from "react-router-dom";

const EditView: React.FC = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAll();

        if (data && Array.isArray(data.documents)) {
          setProjects(data.documents);
        } else {
          throw new Error("Invalid data format received from server.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Fetching projects failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    console.log("Updated projects state:", projects);
  }, [projects]);

  if (loading) {
    return <div className="edit-view-loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="edit-view-error">{error}</div>;
  }
  const handleVersions = (projectId: number) => {
    navigate(`/manageVersions/${projectId}`);
  };
  const handleEditing = (projectId: number) => {
    navigate(`/editing/${projectId}`);
  };
  return (
    <div className="edit-view-container">
      <h2 className="edit-view-title">Projects List</h2>
      <table className="edit-view-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id} style={{ cursor: "pointer" }}>
              <td>{project.title}</td>
              <td>{project.User.username}</td>
              <td>{project.createdAt}</td>
              <td>
                <button onClick={() => handleEditing(project.id)}> edit</button>
                <button onClick={() => handleVersions(project.id)}>
                  {" "}
                  Version
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditView;
