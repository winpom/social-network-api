const express = require('express');
const db = require('./config/connection');
// Require model
const { Department } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates a new department
app.post('/new-department/:department', (req, res) => {
  const newDepartment = new Department({ name: req.params.department });
  newDepartment.save();
  if (newDepartment) {
    res.status(201).json(newDepartment);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds all departments
app.get('/all-departments', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await Department.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds the first matching document
app.get('/find-wine-department', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await Department.findOne({ name: 'Wine' });
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds first document matching parameter and deletes
// For demo, use 'Wine' as URL param
app.delete('/find-one-delete/:departmentName', async (req, res) => {
  try {
    const result = await Department.findOneAndDelete({ name: req.params.departmentName });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
app.put('/find-one-update/:genre', async (req, res) => {
  try {
    // Uses findOneAndUpdate() method on model
    const result = await Genre
      .findOneAndUpdate(
        // Finds first document with name of "Kids"
        { name: 'Kids' },
        // Replaces name with value in URL param
        { name: req.params.genre },
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );
    res.status(200).json(result);
    console.log(`Updated: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
