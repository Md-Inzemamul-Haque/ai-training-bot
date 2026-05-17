import { Tip } from "../models/tip.model.js";

export const getTip = async (req, res) => {
  try {
    const language = (req.query.language || "en").toLowerCase();

    let tips = await Tip.find({ language });

    if (!tips.length && language !== "en") {
      tips = await Tip.find({ language: "en" });
    }

    if (!tips.length) {
      tips = await Tip.find({});
    }

    if (!tips.length) {
      return res.status(200).json({
        message: "No tips found.",
      });
    }

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return res.status(200).json({
      tip: randomTip.content,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch tip",
    });
  }
};