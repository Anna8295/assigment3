//model for our database for the data of data from patients
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TableSchema = new Schema({
    X: Number,
    Y: Number,
    time: Number,
    button: Number,
    correct: Number,
})

const DataSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    filename: String,
    data: { TableSchema }
})

module.exports = mongoose.model('Data', DataSchema);