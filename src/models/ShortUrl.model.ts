import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 6);

export interface ShortUrl extends mongoose.Document {
  destination: string;
  shortId: string;
}

const ShortUrlSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      unique: true,
      default: () => nanoId(),
    },
  },
  {
    timestamps: true,
  }
);

const ShortUrlModel = mongoose.model<ShortUrl>("ShortUrl", ShortUrlSchema);

export default ShortUrlModel;
