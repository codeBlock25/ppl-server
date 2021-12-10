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
var nodemailer_1 = __importDefault(require("nodemailer"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var staff_1 = __importDefault(require("../model/staff"));
var salt = bcryptjs_1.default.genSaltSync(10);
var route = express_1.default.Router();
var transporter = nodemailer_1.default.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env["MaIL_ADDRESS"],
        pass: process.env["MAIL_PASSWORD"],
    },
});
route.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, station_id, full_name, rank, email, phone_num, avatar, staff_level, ranked, ray, marker, ps, password_used, hashedPassword, newStaff;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, station_id = _a.station_id, full_name = _a.full_name, rank = _a.rank, email = _a.email, phone_num = _a.phone_num, avatar = _a.avatar;
                ranked = rank.toLowerCase();
                ray = ranked.split(" ");
                marker = "PS-";
                ray.forEach(function (element) {
                    marker = "" + marker + element.substr(0, 1);
                });
                ps = "" + marker + Math.floor(Math.random() * 958894);
                password_used = crypto_1.default.randomBytes(6).toString("hex");
                hashedPassword = bcryptjs_1.default.hashSync(password_used, salt);
                if (ranked === "inspector general" ||
                    ranked === "deputy inspector-general of police" ||
                    ranked === "assistant inspector-general of police") {
                    staff_level = 1;
                }
                else if (ranked === "commissioner of police" ||
                    ranked === "deputy commissioner of police" ||
                    ranked === "assistant commissioner of police") {
                    staff_level = 2;
                }
                else if (ranked === "chief superintendent of police" ||
                    ranked === "superintendent of police" ||
                    ranked === "deputy superintendent of police") {
                    staff_level = 3;
                }
                else if (ranked === "assistant superintendent of police" ||
                    ranked === "inspector of police" ||
                    ranked === "sergeant major") {
                    staff_level = 4;
                }
                else {
                    staff_level = 5;
                }
                newStaff = new staff_1.default({
                    station_id: station_id,
                    full_name: full_name,
                    office_id: ps,
                    email: email,
                    phone_num: phone_num,
                    password: hashedPassword,
                    rank: rank,
                    staff_level: staff_level,
                    avatar: avatar,
                });
                return [4, newStaff
                        .save()
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    res.status(200).json({ msg: "user saved" });
                                    console.log(password_used);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, transporter
                                            .sendMail({
                                            from: "server " + process.env["MAIL_ADDRESS"],
                                            to: email,
                                            subject: "Officer Details",
                                            html: "\n            <center>\n            <h1>Officer Details</h1>\n            <img \n              src=\"data:image/jpeg;base64, " + avatar + "\" style=\"width: 200px; height: 200px, display: block; border-radius: 20px;\"/>\n            <h2>Your id " + ps + " and password is " + password_used + "</h2>\n            <p>Full name: <b>" + full_name + "</b>\n            </p>\n            <p>\n            Rank: <b>" + ranked + "\n            </p>\n            </center>\n            ",
                                        })
                                            .then(function () {
                                            console.log("message sent");
                                        })];
                                case 2:
                                    _a.sent();
                                    return [3, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    console.error(error_1);
                                    return [3, 4];
                                case 4: return [2];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        var _a;
                        if ((_a = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _a === void 0 ? void 0 : _a.email) {
                            res.status(400).json({ msg: "A user with this email already exits." });
                            return;
                        }
                        res.status(400).json({ msg: "user not saved" });
                    })];
            case 1:
                _b.sent();
                return [2];
        }
    });
}); });
exports.default = route;
