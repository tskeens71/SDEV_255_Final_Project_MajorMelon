const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    description: String,
    subject: String,
    credits: Number,
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }
});

module.exports = mongoose.model('Course', courseSchema);