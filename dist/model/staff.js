"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var newSchema = new mongoose_1.Schema({
    station_id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    office_id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone_num: {
        type: Number,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
        lowercase: true,
    },
    staff_level: {
        type: Number,
        required: true,
    },
    avatar: {
        type: Buffer,
    },
});
var staffModel = (0, mongoose_1.model)("staffPoc", newSchema);
exports.default = staffModel;
