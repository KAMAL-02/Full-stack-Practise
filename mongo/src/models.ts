const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//const io = require('socket.io');

const mobileUsersSchema = new Schema(
  {
    // u: {
    //     type: String,
    // },
    // p: {
    //     type: String,
    // },
    p: {
      type: String,
    },
    n: {
      type: String,
    },
    m: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: Object,
    },
    e: {
      type: String,
      // unique: true,
      required: true,
    },
    a: {
      type: Boolean,
      default: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    token: {
      type: [String],
    },
    blocklist: {
      type: [String],
    },
    ports: {
      type: [Object],
    },
    r: {
      type: String,
      enum: ["t", "c"],
      default: "c",
    },
    userRefreshDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const MobileUser = mongoose.model("MobileUser", mobileUsersSchema, "mobileusers");
export default MobileUser;
