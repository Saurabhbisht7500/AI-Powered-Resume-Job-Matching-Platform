import { useState, useRef } from "react";

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  function handleFileSelect(selected) {
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError("");
    setFile(selected);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setError("Please select a resume PDF first.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription || "");

      const res = await fetch(`${API_URL}/resume/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      onResult(data);
    } catch (err) {
      setError(err.message);
      onResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="upload-card" onSubmit={handleSubmit}>
      <div
        className={`dropzone ${dragOver ? "dragover" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <p>Drag &amp; drop your resume PDF here</p>
        {file && <p className="file-name">{file.name}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
      </div>

      <div className="textarea-group">
        <label className="textarea-label" htmlFor="jobDescription">
          Job description (optional)
        </label>
        <textarea
          id="jobDescription"
          className="job-description-textarea"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          rows={5}
        />
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Analyzing resume..." : "Analyze & Match Jobs"}
      </button>

      {error && <div className="error-box">{error}</div>}
    </form>
  );
}
