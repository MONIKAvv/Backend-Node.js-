
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema matches your existing DB fields (Subjects, capital S)
const questionSchema = new mongoose.Schema({
  Question: String,
  OptionA: String,
  OptionB: String,
  OptionC: String,
  OptionD: String,
  AnswerIndex: String,
  Subjects: String,
  AudioUrl: String,
  Hint: String
});

const Question = mongoose.model('Question', questionSchema);

// Route to get questions by subject
app.get('/questions/:subject', async (req, res) => {
  try {
    const subjectParam = req.params.subject;

    // Case-insensitive search on "Subjects"
    const questions = await Question.find({
      Subjects: { $regex: `^${subjectParam}$`, $options: 'i' }
    });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
