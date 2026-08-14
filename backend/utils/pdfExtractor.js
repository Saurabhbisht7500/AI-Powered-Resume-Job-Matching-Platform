const pdfParse = require("pdf-parse");

/**
 * Extracts raw text from a PDF buffer.
 * @param {Buffer} fileBuffer - the uploaded PDF file buffer
 * @returns {Promise<string>} extracted plain text
 */
async function extractTextFromPDF(fileBuffer) {
  const data = await pdfParse(fileBuffer);
  return data.text || "";
}

module.exports = { extractTextFromPDF };
