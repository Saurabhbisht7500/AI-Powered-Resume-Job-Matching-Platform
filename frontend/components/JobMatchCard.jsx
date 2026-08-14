import { MapPin } from "lucide-react";

function scoreColor(score) {
  if (score >= 70) return { bar: "#16A34A", text: "#16A34A" };
  if (score >= 50) return { bar: "#F97316", text: "#F97316" };
  return { bar: "#DC2626", text: "#DC2626" };
}

export default function JobMatchCard({ job }) {
  const { bar, text } = scoreColor(job.matchScore);
  const skillsToShow = (job.requiredSkills || job.matchedSkills || []).slice(0, 4);

  return (
    <div className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
            style={{ backgroundColor: job.logoColor || "#4F46E5" }}
          >
            {job.logoInitial || job.company?.[0] || "J"}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">{job.title}</p>
            <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
              <span>{job.company}</span>
              <span className="mx-1">·</span>
              <MapPin size={13} />
              <span>{job.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {skillsToShow.map((s) => (
                <span
                  key={s}
                  className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full capitalize"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right w-28 shrink-0">
          <p className="text-2xl font-bold" style={{ color: text }}>
            {job.matchScore}%
          </p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${job.matchScore}%`, backgroundColor: bar }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Match Score</p>
        </div>
      </div>
    </div>
  );
}
