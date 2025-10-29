const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { randomUUID } = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const multerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "LUMINOUS_DEV",
    allowerdFomats: ["png", "jpg", "jpeg"],
  },
});

// Upload an image
const cloudUpload = (imgPath) => {
  cloudinary.uploader
    .upload(imgPath, {
      public_id: "LUMINOUS",
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  cloudUpload,
  multerStorage,
};
