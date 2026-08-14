const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set. AI analysis will not work until the backend has a valid key.");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractResponseText(response) {
  if (!response) return null;
  if (typeof response.output_text === "string") return response.output_text.trim();
  if (Array.isArray(response.output) && response.output.length > 0) {
    const first = response.output[0];
    if (Array.isArray(first.content)) {
      return first.content.map((item) => item.text || "").join("").trim();
    }
    if (typeof first.text === "string") {
      return first.text.trim();
    }
    if (first?.content?.[0]?.text) {
      return first.content[0].text.trim();
    }
  }
  return null;
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function buildFallbackAnalysis(resumeText, jobDescription) {
  const resumeTokens = tokenize(resumeText);
  const jobTokens = tokenize(jobDescription);
  const matchingSkills = [...new Set(resumeTokens.filter((token) => jobTokens.includes(token)))].slice(0, 12);
  const missingSkills = [...new Set(jobTokens.filter((token) => !resumeTokens.includes(token)))].slice(0, 12);
  const score = jobTokens.length ? Math.round((matchingSkills.length / jobTokens.length) * 100) : 65;

  return {
    matchScore: Math.max(0, Math.min(100, score)),
    matchingSkills,
    missingSkills,
    candidateStrengths: matchingSkills.length
      ? `Your resume already contains ${matchingSkills.length} relevant terms from the job description.`
      : "Your resume did not contain many of the exact keywords from the job description.",
    candidateWeaknesses: missingSkills.length
      ? `The resume is missing ${missingSkills.length} important terms from the job description.`
      : "Your resume is close, but more specific job keywords would help.",
    experienceMatch: jobDescription
      ? `There are ${matchingSkills.length} overlapping keyword matches between the resume and the job description.`
      : "No job description was provided, so only basic AI-style feedback is available.",
    educationMatch: "Education detail could not be scored precisely without explicit degree information.",
    resumeAdvice: jobDescription
      ? "Highlight the matched skills more clearly and add any missing job-specific keywords to your resume."
      : "Provide a job description to receive stronger AI comparison feedback.",
    fallback: true,
  };
}

async function analyzeResume(resumeText, jobDescription) {
  const prompt = `You are an AI recruitment assistant.

Analyze the following resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return a single JSON object with these fields:
- matchScore (0-100)
- matchingSkills
- missingSkills
- candidateStrengths
- candidateWeaknesses
- experienceMatch
- educationMatch
- resumeAdvice

Return only valid JSON and do not include any explanatory text outside the JSON object.`;

  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackAnalysis(resumeText, jobDescription);
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const text = extractResponseText(response);
    if (!text) {
      return buildFallbackAnalysis(resumeText, jobDescription);
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      return { rawAIResponse: text };
    }
  } catch (err) {
    console.warn("OpenAI request failed:", err.message);
    return buildFallbackAnalysis(resumeText, jobDescription);
  }
}

module.exports = analyzeResume;