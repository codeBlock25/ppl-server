"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crimeSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        lowercase: true,
    },
    crime: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 70,
    },
    court: {
        type: String,
        required: true,
        lowercase: true,
    },
    sentence: {
        type: String,
        required: true,
        lowercase: true,
    },
    sentence_date: {
        type: Date,
        required: true,
    },
    pic: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
var crimeModel = (0, mongoose_1.model)("crime", crimeSchema);
exports.default = crimeModel;
