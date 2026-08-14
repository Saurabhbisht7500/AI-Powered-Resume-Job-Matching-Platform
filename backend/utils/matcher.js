/**
 * matcher.js
 * -----------
 * A hand-written TF-IDF + cosine similarity engine (no external ML library),
 * combined with direct skill-overlap scoring, to produce a final weighted
 * match score (0-100%) between a resume and a set of job postings.
 *
 * Final score = 60% skill-overlap score + 40% TF-IDF cosine similarity score
 */

const STOPWORDS = new Set([
  "a","an","the","and","or","but","if","then","of","to","in","on","for","with",
  "is","are","was","were","be","been","being","this","that","these","those",
  "it","as","at","by","from","we","you","your","our","i","he","she","they",
  "will","would","can","could","should","have","has","had","do","does","did",
  "not","no","so","such","than","too","very","just","about","into","over",
  "after","before","between","also","using","use","used","etc",
]);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function termFrequency(tokens) {
  const tf = {};
  tokens.forEach((t) => {
    tf[t] = (tf[t] || 0) + 1;
  });
  const total = tokens.length || 1;
  Object.keys(tf).forEach((k) => (tf[k] = tf[k] / total));
  return tf;
}

function inverseDocumentFrequency(documentsTokens) {
  const idf = {};
  const N = documentsTokens.length;
  const vocab = new Set();
  documentsTokens.forEach((tokens) => tokens.forEach((t) => vocab.add(t)));

  vocab.forEach((term) => {
    const docsWithTerm = documentsTokens.filter((tokens) => tokens.includes(term)).length;
    idf[term] = Math.log((N + 1) / (docsWithTerm + 1)) + 1; // smoothed idf
  });

  return idf;
}

function tfidfVector(tf, idf) {
  const vec = {};
  Object.keys(tf).forEach((term) => {
    vec[term] = tf[term] * (idf[term] || 0);
  });
  return vec;
}

function cosineSimilarity(vecA, vecB) {
  const terms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, magA = 0, magB = 0;
  terms.forEach((term) => {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Computes match score between one resume and one job.
 * @param {string} resumeText
 * @param {string[]} resumeSkills
 * @param {object} job - { description, requiredSkills }
 * @param {number} idf - shared idf computed across resume + all jobs
 */
function scoreResumeAgainstJob(resumeText, resumeSkills, job, sharedIdf) {
  // 1) Skill overlap score
  const jobSkillsLower = job.requiredSkills.map((s) => s.toLowerCase());
  const resumeSkillsLower = resumeSkills.map((s) => s.toLowerCase());
  const matchedSkills = jobSkillsLower.filter((s) => resumeSkillsLower.includes(s));
  const missingSkills = jobSkillsLower.filter((s) => !resumeSkillsLower.includes(s));
  const skillOverlapScore = jobSkillsLower.length > 0 ? matchedSkills.length / jobSkillsLower.length : 0;

  // 2) TF-IDF cosine similarity score
  const resumeTokens = tokenize(resumeText);
  const jobTokens = tokenize(job.description + " " + job.requiredSkills.join(" "));
  const resumeVec = tfidfVector(termFrequency(resumeTokens), sharedIdf);
  const jobVec = tfidfVector(termFrequency(jobTokens), sharedIdf);
  const tfidfScore = cosineSimilarity(resumeVec, jobVec);

  // 3) Weighted final score
  const finalScore = skillOverlapScore * 0.6 + tfidfScore * 0.4;

  return {
    matchScore: Math.round(finalScore * 100),
    matchedSkills,
    missingSkills,
  };
}

/**
 * Matches a resume against an array of jobs, returns ranked results.
 */
function matchResumeToJobs(resumeText, resumeSkills, jobs) {
  const resumeTokens = tokenize(resumeText);
  const allJobTokens = jobs.map((j) => tokenize(j.description + " " + j.requiredSkills.join(" ")));
  const sharedIdf = inverseDocumentFrequency([resumeTokens, ...allJobTokens]);

  const results = jobs.map((job) => {
    const { matchScore, matchedSkills, missingSkills } = scoreResumeAgainstJob(
      resumeText,
      resumeSkills,
      job,
      sharedIdf
    );
    return {
      jobId: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      requiredSkills: job.requiredSkills,
      logoInitial: job.logoInitial,
      logoColor: job.logoColor,
      matchScore,
      matchedSkills,
      missingSkills,
    };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { matchResumeToJobs, scoreResumeAgainstJob, tokenize };
