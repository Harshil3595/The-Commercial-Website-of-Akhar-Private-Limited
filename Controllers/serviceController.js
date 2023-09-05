const Service = require('../models/serviceSchema');
const User = require('../models/userSchema');
const Client=require('../models/clientSchema')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djgyljzn3',
  api_key: '138664689167819',
  api_secret: 'l0SisU0nrblvwM-1Zo4bBBQjpN8',
  secure: true
});

const createService = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    return res.status(401).json({ success: false, message: "Please login" });
  }

  const file = req.files.photos;
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file was uploaded" });
  }

  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading image", error: err });
    }

    const service = new Service({
      ...req.body,
      uploadfile: result.secure_url,
      user: user._id,
    });

    try {
      await service.save();
      return res
        .status(201)
        .json({ success: true, message: "Service created successfully", service });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error saving service", error });
    }
  });
};

const clientController = async(req,res) => {
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    return res.status(401).json({ success: false, message: "Please login" });
  }
  
  const file = req.files.photos;
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file was uploaded" });
  }


  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading image", error: err });
    }


    console.log("Result", result);

    const client = new Client({
      uploadfile: result.secure_url,
      user: user._id,
    });

    try {
      await client.save();
      return res
        .status(201)
        .json({ success: true, message: "Client created successfully", service });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error saving client", error });
    }
  });
}

const getAllClients = async (req, res) => {
  const clients = await Client.find();

  return res.status(200).send({ success: true, message: "Fetched", clients });
}

const getAllService = async (req, res) => {
  const services = await Service.find();

  return res.status(200).send({ success: true, message: "Fetched", services });
}

module.exports = { createService, getAllService,clientController,getAllClients };