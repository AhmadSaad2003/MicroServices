import React, { useEffect, useState } from "react";
import { getAll } from "../services/getDocumentsService";
import { Project } from "../interfaces/project";
import "./editView.css";

const EditView: React.FC = () => {
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
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Projects List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>
                <button>{project.title}</button>
              </td>
              {/* Ajoutez d'autres colonnes si nécessaire */}
              {/* <td>{project.author}</td> */}
              {/* <td>{project.creationDate}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditView;
