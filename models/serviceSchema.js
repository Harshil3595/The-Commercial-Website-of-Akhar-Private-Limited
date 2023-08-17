const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter Name"]
  },
  description: {
    type: String,
    // required: [true, "Description is required"]
  },
  uploadfile: {
    type: String, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('service', serviceSchema);
