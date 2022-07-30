const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Create a special 2dsphere index on 'location'
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);