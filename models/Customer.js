import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: String, required: true },
  interests: { type: [String], default: [] },
});

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);