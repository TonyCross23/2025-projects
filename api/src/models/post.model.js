import Joi from "joi";
import { model, Schema } from "mongoose";

export const PostSchemaValidation = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 3 characters long.",
  }),
  content: Joi.string().min(10).required().messages({
    "string.empty": "Content is required.",
    "string.min": "Content must be at least 10 characters long.",
  }),
  imageUrl: Joi.string().required().messages({
    "string.empty": "Image URL is required.",
  }),
  author: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Author is required.",
      "string.pattern.base": "Author must be a valid ObjectId.",
    }),
});

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
    },
    content: {
      type: String,
      required: true,
      min: 10,
    },
    imageUrl: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", PostSchema);
