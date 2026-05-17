import ollama from "ollama";

export const generateResponse = async (prompt) => {
  try {
    const response = await ollama.chat({
      model: "mistral",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.message.content;
  } catch (error) {
    console.error("Ollama Error:", error);
    throw new Error("Failed to generate AI response");
  }
};