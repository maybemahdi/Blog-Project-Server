import { z } from "zod";

const createBlogValidationSchema = z.object({
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
  author: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
});
const updateBlogValidationSchema = z.object({
  title: z.string().nonempty("Title cannot be empty").optional(),
  content: z.string().nonempty("Content cannot be empty").optional(),
  author: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
});

export type CreateBlogValidationType = z.infer<
  typeof createBlogValidationSchema
>;
export type UpdateBlogValidationType = z.infer<
  typeof updateBlogValidationSchema
>;

export const blogValidationSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
