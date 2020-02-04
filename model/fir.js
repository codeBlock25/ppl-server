const mongoose = require("mongoose")
const schema = mongoose.Schema


const newFirRecord = new schema({
    officer_name: {
        type: String,
        // required: true,
        lowercase: true
    },
    officer_email: {
        type: String,
        // required: true,
        lowercase: true
    },
    pertitioner_name: {
        type: String,
        required: true,
        lowercase: true
    },
    pertitioner_contact: {
        type: String,
        required: true
    },
    victim_name: {
        type: String,
        required: true,
        lowercase: true
    },
    victim_contact: {
        type: String,
        required: true,
        lowercase: true
    },
    victim_address: {
        type: String,
        required: true,
        lowercase: true
    },
    accused_name: {
        type: String,
        required: true,
        lowercase: true
    },
    accused_contact: {
        type: String,
        required: true,
        lowercase: true
    },
    accused_address: {
        type: String,
        required: true,
        lowercase: true
    },
    incident_date: {
        type: Date,
        required: true,
        lowercase: true
    },
    incident_place: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    },date: {
        type: Date,
        default: Date.now()
    },
    assigned_officer: {
        type: String,
        lowercase: true,
        required: true
    }
})

module.exports = mongoose.model("fir", newFirRecord)