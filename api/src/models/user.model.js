import Joi from "joi";
import { model, Schema } from "mongoose";

// Validation schema using Joi
export const UserSchemaValidation = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
});

// Mongoose schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Mongoose model
export const User = model("User", UserSchema);
