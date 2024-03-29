"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var randomstring_1 = require("randomstring");
var crime_1 = __importDefault(require("../model/crime"));
var Route = express_1.default.Router();
Route.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, crime, date, court, sentenced, pic, count, newCrimeRecord, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, crime = _a.crime, date = _a.date, court = _a.court, sentenced = _a.sentenced, pic = _a.pic;
                count = (0, randomstring_1.generate)({ length: 24, capitalization: "lowercase" });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newCrimeRecord = new crime_1.default({
                    code: count,
                    crime: crime,
                    court: court,
                    sentence: sentenced,
                    sentence_date: date,
                    pic: pic,
                });
                return [4, newCrimeRecord
                        .save()
                        .then(function () {
                        res.json({ msg: "Record set" });
                    })
                        .catch(function () {
                        res.status(400).json({ msg: "Record not set" });
                    })];
            case 2:
                _b.sent();
                return [3, 4];
            case 3:
                error_1 = _b.sent();
                res.status(400).json({ msg: "Errors found", error: error_1 });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
Route.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.query.token;
                if (!token) return [3, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, crime_1.default
                        .find()
                        .then(function (result) {
                        res.json(result);
                    })
                        .catch(function (err) {
                        console.log(err);
                    })];
            case 2:
                _a.sent();
                return [3, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json({ err: error_2, msg: "Crimes not found" });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
Route.get("/single", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, id, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, token = _a.token, id = _a.id;
                if (!token) return [3, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, crime_1.default
                        .findOne({ _id: id })
                        .then(function (result) {
                        res.json(result);
                    })
                        .catch(function (err) {
                        res.status(404).json(err);
                        console.log(err);
                    })];
            case 2:
                _b.sent();
                return [3, 4];
            case 3:
                error_3 = _b.sent();
                res.status(400).json({ err: error_3, msg: "Crimes not found" });
                return [3, 4];
            case 4: return [3, 6];
            case 5:
                res.status(400).json({ msg: "Invalid token" });
                _b.label = 6;
            case 6: return [2];
        }
    });
}); });
exports.default = Route;
