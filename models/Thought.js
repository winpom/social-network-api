const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction',
  }],
}, {
  toJSON: {
    virtuals: true,
  },
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
