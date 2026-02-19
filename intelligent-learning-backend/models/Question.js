const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    questionText: {
      type: String,
      required: [true, "Question text is required"],
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "Exactly 4 options are required",
      },
    },

    correctAnswer: {
      type: Number, // index of correct option (0–3)
      required: true,
      min: 0,
      max: 3,
    },

    explanation: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
