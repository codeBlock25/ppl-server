const mongoose = require("mongoose")
const schema = mongoose.Schema

const crimeSchema = new schema({
    code: {
        type: String,
        required: true,
        lowercase: true
    },
    crime: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 70
    },
    court: {
        type: String,
        required: true,
        lowercase: true,
    },
    sentence: {
        type: String,
        required: true,
        lowercase: true
    },
    sentence_date: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model("crime", crimeSchema)