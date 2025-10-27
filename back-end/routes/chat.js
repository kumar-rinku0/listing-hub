const Listing = require("../models/listing.js");
const { handleCreateChat, handleChatReply } = require("../controllers/chat.js");

const { Router } = require("express");
const wrapAsync = require("../utils/wrap-async.js");

const route = Router();

route.route("/listingId/:id").post(wrapAsync(handleCreateChat));
route.route("/listingId/:id/chatId/:chatId").post(wrapAsync(handleChatReply));

route.delete(
  "/listingId/:id/chatId/:chatId",
  wrapAsync(async (req, res) => {
    console.log(req.params);
    const { id, chatId } = req.params;
    const listing = await Listing.findByIdAndUpdate(
      id,
      {
        $pull: { chats: chatId },
      },
      { new: true }
    ).populate("chats");
    console.log(listing);
    const chat = await Chat.findByIdAndDelete(chatId);
    res.status(200).send({
      type: "success",
      msg: "chat pruned!",
      deletedChat: chat,
      updatedListing: listing,
    });
  })
);

module.exports = route;
