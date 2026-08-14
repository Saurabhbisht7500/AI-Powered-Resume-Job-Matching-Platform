import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { getJobs } from "../lib/api";
import { MapPin, Briefcase } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then((res) => setJobs(res.data.jobs || []))
      .catch((err) =>
        setError(err?.response?.data?.message || "Could not load jobs. Is the backend running?")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Topbar title="Job Listings" subtitle={`${jobs.length} job postings in the database`} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-400">Loading jobs...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                style={{ backgroundColor: job.logoColor || "#4F46E5" }}
              >
                {job.logoInitial}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{job.title}</p>
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                  <span>{job.company}</span>
                  <span className="mx-1">·</span>
                  <MapPin size={13} />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 line-clamp-3">{job.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.requiredSkills.map((s) => (
                <span
                  key={s}
                  className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full capitalize"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!loading && jobs.length === 0 && !error && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-100">
          <Briefcase size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">
            No jobs found. Run <code className="bg-slate-100 px-1.5 py-0.5 rounded">npm run seed</code>{" "}
            in the backend folder.
          </p>
        </div>
      )}
    </Layout>
  );
}
