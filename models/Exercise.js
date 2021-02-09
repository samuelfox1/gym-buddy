const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'title required'
    },
    type: {
        type: String,
        required: 'excercise type required'
    },
    weight: {
        type: Number,
        required: false
    },
    sets: {
        type: Number,
        required: false
    },
    reps: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: 'duration required'
    },
    cardio: {
        type: Boolean,
        default: false,
    },
    distance: {
        type: Number,
        required: false
    }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise