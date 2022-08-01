import mongoose from "mongoose";

export interface Analytic extends mongoose.Document {
  shortLinkId: string;
  visited: number;
}

const AnalyticSchema = new mongoose.Schema(
  {
    shortLinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortUrl",
    },
    visited: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AnalyticModel = mongoose.model<Analytic>("Analytic", AnalyticSchema);

export default AnalyticModel;
