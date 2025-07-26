import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  link: {
    type: String,
  },
  type: {
    type: String,
    enum: ["youtube", "twitter", "google-doc", "document", "reddit"],
  },
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const contentModel = mongoose.model("Content", contentSchema);
