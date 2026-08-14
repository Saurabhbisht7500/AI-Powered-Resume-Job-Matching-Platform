import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { getResumeHistory, getResumeById } from "../lib/api";
import { MapPin, CheckCircle2, XCircle } from "lucide-react";
import { withAuth } from "../hoc/withAuth";

function scoreColor(score) {
  if (score >= 70) return "#16A34A";
  if (score >= 50) return "#F97316";
  return "#DC2626";
}

function Matches() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const history = await getResumeHistory();
        const resumes = history.data.resumes || [];
        if (resumes.length === 0) {
          setLoading(false);
          return;
        }
        const full = await getResumeById(resumes[0]._id);
        setResume(full.data.resume);
      } catch (err) {
        setError(err?.response?.data?.message || "Could not load matches.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Layout>
      <Topbar
        title="My Matches"
        subtitle={resume ? `Based on ${resume.fileName}` : "Upload a resume to see matches"}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-400">Loading...</p>}

      {!loading && !resume && !error && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-100">
          <p className="text-slate-500 mb-4">No resume uploaded yet.</p>
          <Link href="/upload" className="text-primary font-medium hover:underline">
            Upload a resume →
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {resume?.matches?.map((job) => {
          const color = scoreColor(job.matchScore);
          return (
            <div key={job.jobId} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                    style={{ backgroundColor: job.logoColor || "#4F46E5" }}
                  >
                    {job.logoInitial}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <span>{job.company}</span>
                      <span className="mx-1">·</span>
                      <MapPin size={13} />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right w-28 shrink-0">
                  <p className="text-2xl font-bold" style={{ color }}>
                    {job.matchScore}%
                  </p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${job.matchScore}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-green-500" /> Matched Skills (
                    {job.matchedSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.matchedSkills.length === 0 && (
                      <span className="text-xs text-slate-400">None</span>
                    )}
                    {job.matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full capitalize"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                    <XCircle size={13} className="text-red-400" /> Missing Skills (
                    {job.missingSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.missingSkills.length === 0 && (
                      <span className="text-xs text-slate-400">None</span>
                    )}
                    {job.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="bg-red-50 text-red-500 text-xs px-2.5 py-1 rounded-full capitalize"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default withAuth(Matches);
