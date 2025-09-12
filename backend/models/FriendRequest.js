import mongoose from "mongoose";

const friendReqSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Ensure a user cannot send multiple requests to the same receiver
friendReqSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const FriendReq = mongoose.model("FriendReq", friendReqSchema);
export default FriendReq;
