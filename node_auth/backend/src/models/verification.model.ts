import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationCode";

export interface VerificationDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expireAt: Date;
  createdAt: Date;
}

const VerificationCodeSchema = new mongoose.Schema<VerificationDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expireAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationDocument>(
  "VerificationCode",
  VerificationCodeSchema,
  "verification_codes"
);
export default VerificationCodeModel;
