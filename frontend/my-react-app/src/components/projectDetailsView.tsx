// ProjectDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/getDocumentsService";
import { Project } from "../interfaces/project";
import "./projectDetails.css";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        if (data) {
          setProject(data);
        } else {
          throw new Error("Project not found.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Fetching project details failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) return <div>Loading project details...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="project-details-container">
      <h2>{project.title}</h2>
      <p>
        <strong>Author:</strong> {project.User.username}
      </p>
      <p>
        <strong>Created At:</strong> {project.createdAt}
      </p>
      <p>
        <strong>Content:</strong> {project.content}
      </p>
    </div>
  );
};

export default ProjectDetails;
