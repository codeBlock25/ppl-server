"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = require("mongoose");
var customRoutes_1 = __importDefault(require("./customRoutes"));
var databaseUrl = process.env["DATABASE"] || "mongodb://localhost:27017/police_data_base";
var port = process.env["PORT"] || 4000;
var server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use((0, cors_1.default)());
(0, mongoose_1.connect)(databaseUrl, {})
    .then(function () {
    console.log("Database connected");
})
    .catch(function (err) {
    console.log("Database couldn't connect", "error: " + err);
});
server.use("/api", customRoutes_1.default);
server.listen(port, function () {
    console.log("server running on port: " + port);
});
