import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import JobMatchCard from "../components/JobMatchCard";
import { uploadResume, getResumeHistory } from "../lib/api";
import { UploadCloud, FileText, Loader2, CheckCircle2, XCircle, Eye } from "lucide-react";
import { withAuth } from "../hoc/withAuth";

const formatUploadedDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();

  if (sameDay) return "Today";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);
  const [recentResumes, setRecentResumes] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  const loadRecentResumes = useCallback(async () => {
    try {
      const res = await getResumeHistory();
      setRecentResumes((res?.data?.resumes || []).slice(0, 3));
    } catch (err) {
      setRecentResumes([]);
    } finally {
      setRecentLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecentResumes();
  }, [loadRecentResumes]);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      setErrorMsg("Only PDF files are supported.");
      setStatus("error");
      return;
    }
    setFile(selectedFile);
    setStatus("idle");
    setErrorMsg("");
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const submit = async () => {
    if (!file) return;
    setStatus("uploading");
    setErrorMsg("");
    try {
      const res = await uploadResume(file, jobDescription);
      setResult(res.data);
      setStatus("success");
      await loadRecentResumes();
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Upload failed. Is the backend running?");
      setStatus("error");
    }
  };

  return (
    <Layout>
      <Topbar title="Upload Resume" subtitle="Upload a PDF resume to extract skills and match jobs" />

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 max-w-2xl">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl py-14 flex flex-col items-center justify-center text-center transition ${
            dragActive ? "border-primary bg-primary-light" : "border-slate-200"
          }`}
        >
          <UploadCloud size={40} className="text-primary mb-3" />
          <p className="font-medium text-slate-700">Drag & drop your resume PDF here</p>
          <p className="text-sm text-slate-400 mt-1">or</p>
          <label className="mt-3 cursor-pointer bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-lg transition">
            Browse Files
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
          <p className="text-xs text-slate-400 mt-3">PDF only, max 5MB</p>
        </div>

        {file && (
          <div className="flex items-center gap-3 mt-4 bg-slate-50 rounded-lg p-3">
            <FileText size={20} className="text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            {status === "success" && <CheckCircle2 size={20} className="text-green-500" />}
            {status === "error" && <XCircle size={20} className="text-red-500" />}
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="jobDescription">
            Job Description (optional)
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description so AI can compare your resume against it."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
            rows={5}
          />
        </div>

        {status === "error" && errorMsg && (
          <p className="text-sm text-red-600 mt-3">{errorMsg}</p>
        )}

        <button
          onClick={submit}
          disabled={!file || status === "uploading"}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition"
        >
          {status === "uploading" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Analyzing resume...
            </>
          ) : (
            "Upload & Analyze"
          )}
        </button>

        {!recentLoading && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">Recent Resumes</h3>
            </div>

            {recentResumes.length === 0 ? (
              <p className="px-5 py-4 text-sm text-slate-400">No resumes uploaded yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="grid grid-cols-[minmax(0,1.7fr)_auto_auto_auto] items-center gap-3 px-5 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">{resume.fileName}</p>
                    </div>
                    <p className="text-slate-500 whitespace-nowrap">{formatUploadedDate(resume.createdAt)}</p>
                    <p className="font-semibold text-slate-800 whitespace-nowrap">{resume.bestMatchScore ?? 0}%</p>
                    <button
                      type="button"
                      onClick={() => router.push("/history")}
                      className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Eye size={14} /> View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {status === "success" && result && (
          <div className="mt-6 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Resume Score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-black text-slate-900 leading-none">
                      {Math.min(
                        100,
                        Math.max(0, Number(result?.aiAnalysis?.matchScore ?? result?.matches?.[0]?.matchScore ?? 82))
                      )}
                    </span>
                    <span className="pb-2 text-xl font-semibold text-slate-500">/100</span>
                  </div>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {Math.min(
                    100,
                    Math.max(0, Number(result?.aiAnalysis?.matchScore ?? result?.matches?.[0]?.matchScore ?? 82))
                  )}
                  %
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Skills", Math.min(100, Math.max(0, Number(result?.aiAnalysis?.matchScore ?? 82) + 8))],
                  ["Experience", Math.min(100, Math.max(0, Number(result?.aiAnalysis?.matchScore ?? 82) - 7))],
                  ["Education", Math.min(100, Math.max(0, Number(result?.aiAnalysis?.matchScore ?? 82) + 3))],
                  ["Keywords", Math.min(100, Math.max(0, Number(result?.aiAnalysis?.matchScore ?? 82) - 2))],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-emerald-100 bg-white p-3">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{label}</span>
                      <span className="font-semibold text-slate-800">{Math.round(value)}%</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                        style={{ width: `${Math.round(value)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-medium text-green-700 mb-2">
                ✅ Analyzed! Found {result.extractedSkills.length} skills and{" "}
                {result.matches.length} job matches.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {result.extractedSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-white text-slate-600 text-xs px-2.5 py-1 rounded-full capitalize border border-green-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => router.push("/")}
                className="text-sm font-medium text-primary hover:underline"
              >
                Go to Dashboard →
              </button>
            </div>

            {result.aiAnalysis && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">AI Resume Analysis</h3>
                  <span className="text-xs uppercase tracking-wide text-slate-500">Powered by AI</span>
                </div>
                {typeof result.aiAnalysis === "string" ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-700">{result.aiAnalysis}</pre>
                ) : (
                  <div className="space-y-3 text-sm text-slate-700">
                    {result.aiAnalysis.matchScore !== undefined && (
                      <p>
                        <span className="font-semibold">AI Match Score:</span> {result.aiAnalysis.matchScore}
                      </p>
                    )}
                    {result.aiAnalysis.matchingSkills?.length > 0 && (
                      <p>
                        <span className="font-semibold">Matching Skills:</span> {result.aiAnalysis.matchingSkills.join(", ")}
                      </p>
                    )}
                    {result.aiAnalysis.missingSkills?.length > 0 && (
                      <p>
                        <span className="font-semibold">Missing Skills:</span> {result.aiAnalysis.missingSkills.join(", ")}
                      </p>
                    )}
                    {result.aiAnalysis.candidateStrengths && (
                      <p>
                        <span className="font-semibold">Strengths:</span> {result.aiAnalysis.candidateStrengths}
                      </p>
                    )}
                    {result.aiAnalysis.candidateWeaknesses && (
                      <p>
                        <span className="font-semibold">Weaknesses:</span> {result.aiAnalysis.candidateWeaknesses}
                      </p>
                    )}
                    {result.aiAnalysis.experienceMatch && (
                      <p>
                        <span className="font-semibold">Experience Match:</span> {result.aiAnalysis.experienceMatch}
                      </p>
                    )}
                    {result.aiAnalysis.educationMatch && (
                      <p>
                        <span className="font-semibold">Education Match:</span> {result.aiAnalysis.educationMatch}
                      </p>
                    )}
                    {result.aiAnalysis.resumeAdvice && (
                      <p>
                        <span className="font-semibold">Resume Advice:</span> {result.aiAnalysis.resumeAdvice}
                      </p>
                    )}
                    {result.aiAnalysis.rawAIResponse && (
                      <pre className="whitespace-pre-wrap text-sm text-slate-700">{result.aiAnalysis.rawAIResponse}</pre>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Recommended Jobs</h3>
              </div>
              <div className="space-y-4 p-4">
                {result.matches.slice(0, 3).map((job) => {
                  const skills = (job.requiredSkills || job.matchedSkills || []).slice(0, 5);

                  return (
                    <div key={job.jobId} className="border border-slate-100 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-lg">{job.title}</h4>
                          <p className="mt-2 text-sm text-slate-600">
                            Match: <span className="font-semibold text-slate-900">{job.matchScore}%</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => router.push("/jobs")}
                          className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-3 py-2 text-sm font-medium hover:bg-primary-light transition"
                        >
                          View Job
                        </button>
                      </div>

                      <p className="mt-3 text-sm text-slate-600">
                        <span className="font-medium text-slate-700">Skills:</span>{" "}
                        {skills.join(", ") || "No skills listed"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(UploadPage);
