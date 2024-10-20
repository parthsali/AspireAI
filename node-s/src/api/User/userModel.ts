import mongoose from "mongoose";

// User Model
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  grade: { type: String, required: false, default: "A+" }, // Default grade set to "A+"
  skills: { type: [String], required: false },
  interests: { type: [String], required: false },
  experiences: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
  projects: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
  password: { type: String, required: true },
  chatHistory: [
    {
      req: { type: String, required: false },
      res: { type: String, required: false },
      time: { type: String, required: false },
    },
  ],
});

export default mongoose.model("User", userSchema);
