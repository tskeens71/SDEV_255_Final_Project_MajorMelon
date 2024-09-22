
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Import Models
const Teacher = require('./Teacher');
const Course = require('./Course');
const Student = require('./Student');

// Routes
// Add a new course
app.post('/courses', async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher');
        res.status(200).send(courses);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Course deleted' });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});