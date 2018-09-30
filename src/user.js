const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post')

const UserSchema = new Schema ({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number,
    post: [PostSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;