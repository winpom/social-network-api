const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../../models');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    const thoughtObj = {
      thoughts,
      reactions,
    };
    return res.json(thoughtObj);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Get a single thought
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean();

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json({
      thought,
      reactions: await grade(req.params.thoughtId),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// create new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
})

// delete a thought
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No such thought exists' })
    }

    const reaction = await Reaction.findOneAndUpdate(
      { thought: req.params.thoughtId },
      { $pull: { reactions: req.params.thoughtId } },
      { new: true }
    );

    if (!reaction) {
      return res.status(404).json({
        message: 'Thought deleted, but no reactions found',
      });
    }

    res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add an reaction to a thought
router.get('/:thoughtId/reactions', async (req, res) => {
  try {
    console.log('You are adding an reaction');
    console.log(req.body);
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' })
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove reaction from a thought
router.delete('/:id/reactions/id', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
