const User = require('../models/userSchema');
const Inquiry = require('../models/inquirySchema');
const cloudinary=require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'daqbwpz1a', 
  api_key: '376121359368717', 
  api_secret: 'K5-1j0bfoAzeX5VOj3Fo1dzErko',
  secure: true
});

const inquiryController = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Please login"
    });
  }

  const file = req.files ? req.files.attachment : null;
  
  const email = user.email; 
  const inquiry = new Inquiry({
    ...req.body,
    user: user._id,
    email: email,
  });

  if (file) {
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        inquiry.attachment = result.secure_url;
        saveInquiry(inquiry, res);
      }
    });
  } else {
    saveInquiry(inquiry, res);
  }
};

const saveInquiry = async (inquiry, res) => {
  try {
    await inquiry.save(); 
    return res.status(201).json({ success: true, message: "success", inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error saving inquiry", error });
  }
};

const getAllInquiryController = async (req, res) => {
  const inquirys = await Inquiry.find();

  return res.status(200).send({ success: true, message: "Fetched", inquirys });
};

const getAllInquiryForDisplay = async (req,res) => {
  const inquiry = await Inquiry.find({_id:req.params.id});
  return res.status(200).send({ success: true, message: "fetched single inquiry", inquiry });

}

const getMyInquirysController = async (req, res) => {
  const inquirys = await Inquiry.find({ user: req.userId });

  return res.status(200).send({ success: true, message: "Fetched", inquirys });
};

const updateInquiryStatus = async (req, res) => {
  const { inquiryId } = req.params; 

  const { status } = req.body;

  console.log("ID", inquiryId);

  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: inquiryId },
      { status: status },
      { new: true }
    );

    if (!inquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Inquiry status updated", status });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating inquiry status", error });
  }
};


module.exports = { inquiryController, getAllInquiryController, getMyInquirysController,updateInquiryStatus ,getAllInquiryForDisplay};
