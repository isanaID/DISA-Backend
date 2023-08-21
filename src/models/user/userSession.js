const mongoose = require("mongoose");
const timeHelpers = require("../../helpers/TimeHelper");

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    expiredIn: {
      type: Date,
      expires: 60,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

SessionSchema.pre("save", async function (next) {
  this.expiredIn = await timeHelpers.expiredDate(3, "days");
  next();
});

module.exports = mongoose.model("UserSession", SessionSchema);
