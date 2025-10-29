const { Schema, model } = require("mongoose");
const Chat = require("./chat.js");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required!"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negetive!"],
    },
    location: {
      value: {
        type: String,
      },
      geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ["Point"], // 'location.type' must be 'Point'
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      country: {
        type: String,
        required: true,
      },
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
    sold: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.chats.length) {
    await Chat.deleteMany({ _id: { $in: listing.chats } });
  }
});

listingSchema.post("deleteMany", async (listings) => {
  console.log(listings);
  // const result = await Review.deleteMany({});
  // console.log(result);
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
