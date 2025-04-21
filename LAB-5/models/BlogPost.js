const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
