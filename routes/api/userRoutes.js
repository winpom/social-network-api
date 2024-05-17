const router = require('express').Router();
const { User, Thought } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v');
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a single user by _id
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
      .populate('thoughts')
      .populate('friends')
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a user by _id
router.put('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a user by _id
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { friends: req.body.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $pull: { friends: req.body.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
