const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let reactionsCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionsCheck.length) {
    await connection.dropCollection('reactions');
  }

const users = [
    {
      username: "Nick",
      email: "usernumber1@gmail.com",
    },
    {
      username: "Win",
      email: "usernumber2@gmail.com",
    },
    {
      username: "Edwin",
      email: "usernumber3@gmail.com",
    },
    {
      username: "Tapia",
      email: "usernumber4@gmail.com",
    },
    {
      username: "burgerfan",
      email: "usernumber5@gmail.com",
    },
  ];

  const userData = await User.insertMany(users);

  const thoughts = [
    {
      thoughtText: "I thought, therefore I... wait what",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      thoughtText: "IDK man",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      thoughtText: "How can you expect me to use ANOTHER social account?",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      thoughtText: "My name is Jeff",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      thoughtText: "But why?",
      username: [...userData.map(({ _id }) => _id)],
    },
  ];

  const thoughtData = await Thought.insertMany(thoughts);

  const reactions = [
    {
      reactionBody: "Dumb",
      username: [...userData.map(({ _id }) => _id)], 
    },
    {
      reactionBody: "Smart",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      reactionBody: "Cool",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      reactionBody: "Lame",
      username: [...userData.map(({ _id }) => _id)],
    },
    {
      reactionBody: "Meh",
      username: [...userData.map(({ _id }) => _id)],
    },
  ];

  const reactionData = await Reaction.insertMany(reactions);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
