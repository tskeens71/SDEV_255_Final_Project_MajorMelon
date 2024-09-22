const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);