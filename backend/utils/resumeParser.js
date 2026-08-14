const pdfParse = require("pdf-parse");

/**
 * Extracts raw text content from a PDF file buffer.
 * @param {Buffer} fileBuffer - The uploaded PDF file buffer (from multer memoryStorage).
 * @returns {Promise<string>} plain text content of the PDF
 */
async function extractTextFromPDF(fileBuffer) {
  const data = await pdfParse(fileBuffer);
  // Normalize whitespace for cleaner downstream NLP processing
  return data.text.replace(/\r/g, " ").replace(/\s+/g, " ").trim();
}

module.exports = { extractTextFromPDF };
