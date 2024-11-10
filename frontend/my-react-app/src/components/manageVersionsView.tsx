import React, { useEffect, useState } from "react";
import { getAllVersions } from "../services/getVersionsService";
import { Version } from "../interfaces/version";
import { useParams } from "react-router-dom";
import "./manageVersionsView.css";

const ManageVersions: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        if (!documentId) {
          throw new Error("No document ID provided.");
        }

        const data = await getAllVersions(parseInt(documentId, 10));
        console.log(data);
        setVersions(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Fetching versions failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, [documentId]);

  if (loading) {
    return <div className="manage-versions-loading">Loading versions...</div>;
  }

  if (error) {
    return <div className="manage-versions-error">{error}</div>;
  }

  return (
    <div className="manage-versions-container">
      <h2 className="manage-versions-title">Version History</h2>
      <table className="manage-versions-table">
        <thead>
          <tr>
            <th>Version</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version) => (
            <tr key={version.id}>
              <td>{version.version}</td>
              <td>{version.title}</td>
              <td>{version.content}</td>
              <td>{new Date(version.createdAt).toLocaleString()}</td>
              <td>{new Date(version.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVersions;
