const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    msg: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new Schema({
  messages: [messageSchema],
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
