import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: [true, "Title is required"] },
    content: { type: String, required: [true, "Content is required"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Transform the output to exclude __v, isPublished, and timestamps
BlogSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.isPublished;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Blog = model<IBlog>("Blog", BlogSchema);
