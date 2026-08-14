import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import JobMatchCard from "../components/JobMatchCard";
import { getResumeHistory, getResumeById, getJobs } from "../lib/api";
import { withAuth } from "../hoc/withAuth";
import {
  FileText,
  Briefcase,
  TrendingUp,
  Star,
  Eye,
  CheckCircle2,
  Activity,
} from "lucide-react";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [latestResume, setLatestResume] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [resumeCount, setResumeCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    async function load() {
      setResumeCount(0);
      setJobCount(0);
      setAvgScore(0);
      setLatestResume(null);

      try {
        const [historyRes] = await Promise.all([getResumeHistory()]);
        const resumes = historyRes.data.resumes || [];
        setResumeCount(resumes.length);

        if (resumes.length > 0) {
          const avg =
            resumes.reduce((sum, r) => sum + (r.bestMatchScore || 0), 0) / resumes.length;
          setAvgScore(Math.round(avg));

          const fullRes = await getResumeById(resumes[0]._id);
          const resumeData = fullRes.data.resume;
          setLatestResume(resumeData);
          setJobCount(resumeData?.matches?.length || 0);
        } else {
          setJobCount(0);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Could not connect to the backend. Make sure the server is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const topMatches = latestResume?.matches?.slice(0, 3) || [];
  const bestScore = latestResume?.matches?.[0]?.matchScore || 0;
  const bestTitle = latestResume?.matches?.[0]?.title || "—";

  return (
    <Layout>
      <Topbar title="Welcome back!" subtitle="Here's your career match overview" showLogout={true} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {!loading && !error && resumeCount === 0 && (
        <div className="bg-primary-light border border-primary/20 text-primary text-sm rounded-lg p-4 mb-6">
          No resume uploaded yet.{" "}
          <Link href="/upload" className="underline font-medium">
            Upload your first resume
          </Link>{" "}
          to see your match overview.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={FileText}
          iconBg="#EDE9FE"
          iconColor="#7C3AED"
          label="Resumes Uploaded"
          value={resumeCount}
          sub="Total resumes"
        />
        <StatCard
          icon={Briefcase}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
          label="Jobs Analyzed"
          value={jobCount}
          sub="Across all postings"
        />
        <StatCard
          icon={TrendingUp}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
          label="Best Match Score"
          value={`${bestScore}%`}
          sub={bestTitle}
        />
        <StatCard
          icon={Star}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          label="Average Match Score"
          value={`${avgScore}%`}
          sub="Across all matches"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top Job Matches */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-primary" />
              <h2 className="font-semibold text-slate-900">Top Job Matches</h2>
            </div>
            <Link href="/matches" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>

          {loading && <p className="text-sm text-slate-400 py-8 text-center">Loading...</p>}

          {!loading && topMatches.length === 0 && (
            <p className="text-sm text-slate-400 py-8 text-center">
              Upload a resume to see your top job matches here.
            </p>
          )}

          <div className="space-y-3">
            {topMatches.map((job) => (
              <JobMatchCard key={job.jobId} job={job} />
            ))}
          </div>

          {topMatches.length > 0 && (
            <Link
              href="/matches"
              className="block text-center mt-4 border border-primary text-primary font-medium text-sm py-2.5 rounded-lg hover:bg-primary-light transition"
            >
              View All Matches
            </Link>
          )}
        </div>

        {/* Resume Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              <h2 className="font-semibold text-slate-900">Your Resume Summary</h2>
            </div>
            <Link href="/upload" className="text-sm font-medium text-primary hover:underline">
              Edit
            </Link>
          </div>

          {!latestResume && (
            <p className="text-sm text-slate-400 py-8 text-center">No resume uploaded yet.</p>
          )}

          {latestResume && (
            <>
              <div className="bg-primary-light rounded-xl p-4 mb-4">
                <p className="font-medium text-primary text-sm truncate">{latestResume.fileName}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Uploaded on {new Date(latestResume.createdAt).toLocaleDateString()} ·{" "}
                  {(latestResume.fileSizeKB / 1024).toFixed(1)} MB
                </p>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full mt-2">
                  <CheckCircle2 size={12} /> Parsed Successfully
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700 mb-2">
                Extracted Skills ({latestResume.extractedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {latestResume.extractedSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full capitalize"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href={`/history`}
                className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium text-sm py-2.5 rounded-lg hover:bg-slate-50 transition"
              >
                <Eye size={16} /> View Full Resume
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            <h2 className="font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <Link href="/history" className="text-sm font-medium text-primary hover:underline">
            View All Activity
          </Link>
        </div>
        {latestResume ? (
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-slate-700">
              Resume "{latestResume.fileName}" analyzed
            </span>
            <span className="text-slate-400 ml-auto">
              {new Date(latestResume.createdAt).toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No activity yet.</p>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
