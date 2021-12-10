"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});
var messageModel = (0, mongoose_1.model)("messages", messageSchema);
exports.default = messageModel;
