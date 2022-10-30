const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    datas: {
        type: Schema.Types.ObjectId,
        ref: 'Data'
    }
});

module.exports = mongoose.model("Note", noteSchema);