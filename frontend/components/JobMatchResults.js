import MatchScoreBar from "./MatchScoreBar";

function scoreColor(score) {
  if (score >= 70) return "#1c8a4c";
  if (score >= 40) return "#d19b0b";
  return "#b3392f";
}

export default function JobMatchResults({ matches }) {
  if (!matches || matches.length === 0) return null;

  return (
    <div>
      <h2 className="results-header">Job Matches ({matches.length})</h2>
      {matches.map((job) => (
        <div className="job-card" key={job._id}>
          <div className="job-card-top">
            <div>
              <p className="job-title">{job.title}</p>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
            </div>
            <div
              className="score-badge"
              style={{ background: scoreColor(job.matchScore) }}
            >
              {job.matchScore}%
            </div>
          </div>

          <MatchScoreBar score={job.matchScore} />

          <p className="job-desc">{job.description}</p>

          {job.matchedSkills.length > 0 && (
            <>
              <div className="section-label">Matched skills</div>
              <div className="skill-tags-row">
                {job.matchedSkills.map((s) => (
                  <span className="tag-matched" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}

          {job.missingSkills.length > 0 && (
            <>
              <div className="section-label">Missing skills</div>
              <div className="skill-tags-row">
                {job.missingSkills.map((s) => (
                  <span className="tag-missing" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
