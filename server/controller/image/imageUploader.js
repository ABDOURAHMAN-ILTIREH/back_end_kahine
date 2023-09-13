// server/controllers/uploadController.js
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_folder_name', // Change this to your desired folder name
    format: async (req, file) => 'png', // Use desired image format
  },
});

const upload = multer({ storage });

// const uploadImage = upload.single('image');

const saveImageToDatabase = async (type, imageUrl) => {
  try {
    if (type === 'user') {
      await prisma.user.create({
        data: {
          profileImageUrl: imageUrl,
        },
      });
    } else if (type === 'product') {
      await prisma.product.create({
        data: {
          imageUrl: imageUrl,
        },
      });
    }
    console.log('Image URL saved to database.');
  } catch (error) {
    console.error('Error saving image URL to database:', error);
  }
};

const uploadImage = (req, res) => {
  const { type } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  const imageUrl = req.file.path;

  cloudinary.uploader.upload(imageUrl, async (result) => {
    if (result.error) {
      return res.status(500).json({ error: 'Error uploading image to Cloudinary.' });
    }

    const cloudinaryImageUrl = result.secure_url;

    saveImageToDatabase(type, cloudinaryImageUrl);

    return res.status(201).json({ imageUrl: cloudinaryImageUrl });
  });
};

module.exports = { uploadImage };