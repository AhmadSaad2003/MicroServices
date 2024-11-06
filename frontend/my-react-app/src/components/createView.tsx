import React, { useState } from "react";
import "./createView.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createFirst } from "../services/createFileServise";

function TextEditor() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const plainText = doc.body.textContent || "";
    setText(plainText);
  };

  const handleTitleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await createFirst(title, text);
      alert("Content saved!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Creation failed. Please try again."
      );
    }
    console.log("Saved content:", text);
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

  return (
    <div>
      <input
        type="text"
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
        onChange={handleChange}
        modules={modules}
        style={editorStyle}
      />
    </div>
  );
}

export default TextEditor;
