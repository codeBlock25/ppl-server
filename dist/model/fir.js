"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var newFirRecord = new mongoose_1.Schema({
    officer_name: {
        type: String,
        lowercase: true,
    },
    officer_email: {
        type: String,
        lowercase: true,
    },
    petitioner_name: {
        type: String,
        lowercase: true,
    },
    petitioner_contact: {
        type: String,
    },
    victim_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    victim_contact: {
        type: String,
        required: true,
        lowercase: true,
    },
    victim_address: {
        type: String,
        required: true,
        lowercase: true,
    },
    accused_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    accused_contact: {
        type: String,
        required: true,
        lowercase: true,
    },
    accused_address: {
        type: String,
        required: true,
        lowercase: true,
    },
    incident_date: {
        type: Date,
        required: true,
        lowercase: true,
    },
    incident_place: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    assigned_officer: {
        type: String,
        lowercase: true,
        required: true,
    },
});
var firModel = (0, mongoose_1.model)("fir", newFirRecord);
exports.default = firModel;
