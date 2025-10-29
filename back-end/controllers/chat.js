const Chat = require("../models/chat");
const Listing = require("../models/listing");

const handleCreateChat = async (req, res) => {
  let user = req.user;
  const { id } = req.params;
  const { msg } = req.body;
  const listing = await Listing.findById(id).populate("chats");

  const chat = new Chat({
    messages: [
      {
        username: user.username,
        msg,
      },
    ],
  });
  listing.chats.push(chat);
  await chat.save();
  await listing.save();
  return res
    .status(200)
    .send({ type: "success", msg: "message sent!", listing: listing });
};

const handleChatReply = async (req, res) => {
  let user = req.user;
  const { id, chatId } = req.params;
  const { msg } = req.body;
  const listing = await Listing.findById(id).populate("chats");

  const chat = await Chat.findById(chatId);
  chat.messages.push({
    username: user.username,
    msg,
  });
  await chat.save();
  return res
    .status(200)
    .send({ type: "success", msg: "message sent!", listing: listing });
};

module.exports = {
  handleCreateChat,
  handleChatReply,
};
