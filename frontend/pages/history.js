import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { getResumeHistory } from "../lib/api";
import { FileText, Clock } from "lucide-react";
import { withAuth } from "../hoc/withAuth";

function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getResumeHistory()
      .then((res) => setResumes(res.data.resumes || []))
      .catch((err) => setError(err?.response?.data?.message || "Could not load history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Topbar title="Resume History" subtitle="All resumes you've uploaded and analyzed" />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-400">Loading...</p>}

      {!loading && resumes.length === 0 && !error && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-100">
          <Clock size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 mb-4">No resumes uploaded yet.</p>
          <Link href="/upload" className="text-primary font-medium hover:underline">
            Upload your first resume →
          </Link>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
        {resumes.map((r) => (
          <div key={r._id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-primary" />
              <div>
                <p className="font-medium text-slate-800 text-sm">{r.fileName}</p>
                <p className="text-xs text-slate-400">
                  {new Date(r.createdAt).toLocaleString()} · {r.fileSizeKB} KB ·{" "}
                  {r.extractedSkills.length} skills
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-800">{r.bestMatchScore}%</p>
              <p className="text-xs text-slate-400">{r.bestMatchTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default withAuth(History);
