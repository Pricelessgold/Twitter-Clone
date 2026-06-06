import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: [280, "Tweet cannot exceed 280 characters"],
  },

  upvotes: {
    type: Number,
    default: 0,
  },

  downvotes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Tweet =
  mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);