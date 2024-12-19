import { z } from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .nonempty("Title cannot be empty"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .nonempty("Content cannot be empty"),
  author: z
    .string().optional(),
  isPublished: z.boolean().optional().default(true),
});

export type BlogValidationType = z.infer<typeof blogValidationSchema>;
