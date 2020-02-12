const mongoose = require("mongoose")
const schema = mongoose.Schema

const messageSchema = new schema({
    message: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now(),
        required: true
    }
})


module.exports = mongoose.model("messages", messageSchema)