import mongoose from "mongoose";

const TokenPackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tokens: { type: Number, required: true },
  priceTND: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("TokenPack", TokenPackSchema);
