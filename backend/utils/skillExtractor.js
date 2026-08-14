const SKILL_DICTIONARY = require("./skillList");

/**
 * Basic keyword-based NLP skill extraction.
 * Normalizes resume text and scans it against the skill dictionary,
 * matching whole-word/phrase variants to avoid false positives
 * (e.g. "go" won't match inside "google").
 *
 * @param {string} text - raw resume text
 * @returns {string[]} array of normalized, deduplicated skill names
 */
function extractSkills(text) {
  if (!text) return [];

  const normalized = " " + text.toLowerCase().replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ") + " ";
  const found = new Set();

  for (const [skillName, variants] of Object.entries(SKILL_DICTIONARY)) {
    for (const variant of variants) {
      const needle = variant.startsWith(" ") || variant.endsWith(" ") ? variant : ` ${variant} `;
      if (normalized.includes(needle) || normalized.includes(` ${variant.trim()},`) || normalized.includes(` ${variant.trim()}.`)) {
        found.add(skillName);
        break;
      }
    }
  }

  return Array.from(found).sort();
}

module.exports = { extractSkills };
