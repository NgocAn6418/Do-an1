var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types
var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    text: String,
    postedBy: {
      type: ObjectId,
      ref: 'User'
    }
  }],
  photo: {
    type: String,
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Post', postSchema);
