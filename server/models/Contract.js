import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  start_dt: { type: Date, default: Date.now },
  end_dt: { type: Date },
  
  etat: { 
    type: String, 
    enum: ["active", "completed", "cancelled"], 
    default: "active" 
  }
});

export default mongoose.model("Contract", ContractSchema);
