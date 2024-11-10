import React, { useState, useEffect } from "react";
import "./editingView.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/getDocumentsService";
import { Project } from "../interfaces/project";

function Editing() {
  const { documentId } = useParams<{ documentId: string }>();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!documentId) throw new Error("No document Id provided.");

        const data = await getProjectById(parseInt(documentId, 10));
        setProject(data);
        setText(data.content || "");
        setTitle(data.title || "");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Fetching project failed. Please try again"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [documentId]);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const plainText = doc.body.textContent || "";

      alert("Content saved!");
      console.log("Saved plain content:", plainText);
      console.log("Saved HTML content:", text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Saving failed. Please try again."
      );
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const editorStyle = {
    height: "600px",
    marginBottom: "20px",
    width: "1000px",
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title..."
        style={{ display: "block", marginBottom: "10px", padding: "10px" }}
      />
      <button
        onClick={handleSave}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Save
      </button>

      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        style={editorStyle}
      />
    </div>
  );
}

export default Editing;
