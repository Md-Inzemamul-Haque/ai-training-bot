import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tip = mongoose.model(
  "Tip",
  tipSchema
);