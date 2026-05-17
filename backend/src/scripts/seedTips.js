import mongoose from "mongoose";
import { Tip } from "../models/tip.model.js";
import connectDB from "../../config/db.js";

// Seed data
const tips = [
  { language: "en", content: "Always validate user input before processing it." },
  { language: "en", content: "Break large problems into smaller components before coding." },
  { language: "en", content: "Use meaningful variable names to improve readability." },
  { language: "en", content: "Handle errors gracefully instead of letting the app crash." },
  { language: "en", content: "Write tests for critical business logic." },

  { language: "hi", content: "हमेशा user input को validate करें।" },
  { language: "hi", content: "बड़े problems को छोटे हिस्सों में divide करें।" },
  { language: "hi", content: "Meaningful variable names का उपयोग करें।" },
  { language: "hi", content: "Errors को gracefully handle करें।" },
  { language: "hi", content: "Important logic के लिए tests जरूर लिखें।" },

  { language: "es", content: "Siempre valida la entrada del usuario antes de procesarla." },
  { language: "es", content: "Divide problemas grandes en partes más pequeñas." },
  { language: "es", content: "Usa nombres de variables significativos." },
  { language: "es", content: "Maneja los errores de forma adecuada." },
  { language: "es", content: "Escribe pruebas para la lógica crítica." },
];

const seedTips = async () => {
  try {
    await connectDB();
    await Tip.deleteMany({});
    await Tip.insertMany(tips);
    console.log(`Successfully seeded ${tips.length} tips`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedTips();