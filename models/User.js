const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'username required'
    },
    first_name: {
        type: String,
        trim: true,
        required: 'first name required'
    },
    last_name: {
        type: String,
        trim: true,
        required: 'last name required'
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: ' email required'
    },
    password: {
        type: String,
        trim: true,
        required: 'password required'
    },
    routines: {
        type: Schema.Types.ObjectId,
        ref: 'Routine'
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User;