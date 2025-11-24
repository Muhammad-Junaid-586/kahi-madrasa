import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
      trim: true,
    },

    // store all books in a single array
    books: [
      {
        type: String,
        trim: true,
      }
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Grade || mongoose.model("Grade", gradeSchema);
