const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'title required'
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
})

const Routine = mongoose.model('Routine', RoutineSchema)

module.exports = Routine
