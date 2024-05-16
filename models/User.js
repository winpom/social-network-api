const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  type: Schema.Types.ObjectId,
  ref: 'Thought',
});

const friendSchema = new Schema({
  type: Schema.Types.ObjectId,
  ref: 'User',
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
    maxlength: 50,
  },
  thoughts: [thoughtSchema],
  friends: [friendSchema],
}, {
  toJSON: {
    virtuals: true,
  },
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
