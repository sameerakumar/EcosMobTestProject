const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    sendMailTime: {
        type: String,
        required: false
    },
    isReplayed: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: String,
        required: false
    },
    updatedAt: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('user', userSchema);