const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  uploadfile: {
    type: String, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('Client', clientSchema);
