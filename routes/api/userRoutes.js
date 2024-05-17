const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const userObj = {
      users,
      headCount: await headCount(),
    };
    return res.json(userObj);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Get a single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json({
      user,
      grade: await grade(req.params.userId),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user 
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' })
    }

    const thought = await Thought.findOneAndUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({
        message: 'User deleted, but no thoughts found',
      });
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add a new friend
router.post('/:id/friends/:friendId', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a friend 
router.delete('/:id/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' })
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
