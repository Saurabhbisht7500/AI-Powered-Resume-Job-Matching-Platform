function getDashboardStats(resumes = []) {
  const normalizedResumes = Array.isArray(resumes) ? resumes : [];

  const totalResumes = normalizedResumes.length;
  const totalJobsAnalyzed = normalizedResumes.reduce((total, resume) => {
    const matches = Array.isArray(resume?.matches) ? resume.matches : [];
    return total + matches.length;
  }, 0);

  const averageMatchScore = totalResumes
    ? Math.round(
        normalizedResumes.reduce((sum, resume) => {
          const score = Number(resume?.bestMatchScore ?? 0);
          return sum + score;
        }, 0) / totalResumes
      )
    : 0;

  const bestMatchScore = normalizedResumes.reduce((max, resume) => {
    const score = Number(resume?.bestMatchScore ?? 0);
    return Math.max(max, score);
  }, 0);

  const latestResume = normalizedResumes[0] || null;

  return {
    totalResumes,
    totalJobsAnalyzed,
    averageMatchScore,
    bestMatchScore,
    latestResume,
  };
}

module.exports = { getDashboardStats };
