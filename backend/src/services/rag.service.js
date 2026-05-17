import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knowledgeBasePath = path.join(__dirname, "../knowledge-base");

export const retrieveRelevantContext = async (question) => {
  try {
    const files = fs.readdirSync(knowledgeBasePath);

    const stopWords = new Set([
      "what", "is", "the", "and", "for", "with", "between",
      "does", "how", "why", "are", "was", "were", "a",
      "an", "of", "to", "in"
    ]);

    const keywords = question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.has(word));

    const matchedContents = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(knowledgeBasePath, file);

      const content = fs.readFileSync(filePath, "utf-8").toLowerCase();

      let score = 0;

      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          score += 1;
        }
      }

      if (score > 0) {
        matchedContents.push({
          score,
          source: file,
          content,
        });
      }
    }

    matchedContents.sort((a, b) => b.score - a.score);

    const topMatches = matchedContents.slice(0, 3);

    const context = topMatches
      .map((item) => item.content)
      .join("\n\n");

    const sources = topMatches.map((item) => item.source);

    return {
      context: context || "",
      source: sources || [],
    };

  } catch (error) {
    console.error("RAG Retrieval Error:", error);

    return {
      context: "",
      source: [],
    };
  }
};

export const retrieveQuizContext = async (
  topic
) => {
  try {

    const fileName =
      `${topic.toLowerCase()}.md`;

    const filePath = path.join(
      knowledgeBasePath,
      fileName
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return fs.readFileSync(
      filePath,
      "utf-8"
    );

  } catch (error) {

    console.error(
      "Quiz Context Error:",
      error
    );

    throw new Error(
      "Failed to retrieve quiz context"
    );
  }
};