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
var _this = this;
var express = require("express");
var app = express();
var router = express.Router();
app.use(express.json());
var mongoose = require('mongoose');
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var verifyToken = require('./middleware/protectRoute');
require('dotenv').config(); //to hide passwords
mongoose.connect("mongodb://raoufmadani-memberapp:" + process.env.PASSWORD + "@cluster0-shard-00-00.4kbqq.mongodb.net:27017,cluster0-shard-00-01.4kbqq.mongodb.net:27017,cluster0-shard-00-02.4kbqq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iq58od-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(function () {
    app.listen(3000, function () { return console.log('Server is on'); });
})["catch"](function (err) { return console.log(err); });
var Member = require('./models/Member');
// Verify memberInfo validity during registration
var validation = [check('name').isLength({ min: 3 }).withMessage('Please provide your name!'),
    check('email').isEmail().withMessage('Please provide a valid email!'), check('password').isLength({ min: 6 }).withMessage('Your password should contain minimum 6 letters!')];
// Verify memberInfo validity during login
var validationLogin = [check('email').isEmail().withMessage('Please provide a valid email!'), check('password').isLength({ min: 6 }).withMessage('Your password should contain minimum 6 letters!')];
// post request to register a new member, asynchronous function
router.post('/register', validation, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var error, memberExist, rounds, hashpass, newMember, memberInfo, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = validationResult(req);
                if (!error.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: error.array() })];
                }
                return [4 /*yield*/, Member.findOne({ email: req.body.email })];
            case 1:
                memberExist = _a.sent();
                if (memberExist)
                    return [2 /*return*/, res.status(400).send({ success: false, message: 'Email already exists!' })];
                return [4 /*yield*/, bcrypt.genSalt()];
            case 2:
                rounds = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, rounds)];
            case 3:
                hashpass = _a.sent();
                newMember = new Member({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashpass,
                    address: req.body.address,
                    birthdate: req.body.birthdate,
                    entranceDate: req.body.entranceDate
                });
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, newMember.save()];
            case 5:
                memberInfo = _a.sent();
                token = jwt.sign({ _id: newMember._id, email: newMember.email, name: newMember.name }, process.env.SECRET);
                res.send({ success: true, data: memberInfo, token: token });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                //catch the error
                console.log({ success: false, err: err_1 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//post request to login a member if his account exists
router.post('/login', validationLogin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var error, member, correctPass, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = validationResult(req);
                if (!error.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: error.array() })];
                }
                return [4 /*yield*/, Member.findOne({ email: req.body.email })];
            case 1:
                member = _a.sent();
                if (!member)
                    return [2 /*return*/, res.status(404).send({ success: false, message: "You're not a member, don't miss with us" })];
                return [4 /*yield*/, bcrypt.compare(req.body.password, member.password)];
            case 2:
                correctPass = _a.sent();
                if (!correctPass)
                    return [2 /*return*/, res.status(404).send({ success: false, messsage: "Your email or password is worng!" })];
                token = jwt.sign({ _id: member._id, email: member.email, name: member.name }, process.env.SECRET);
                res.header('auth-token', token).send({ success: true, message: "Hi " + member.name + ", welcome back!", token: token });
                return [2 /*return*/];
        }
    });
}); });
//update a member (post request)
router.patch('/updateMember/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var updatedMember, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Member.findByIdAndUpdate(req.params.id, req.body, { "new": true })];
            case 1:
                updatedMember = _a.sent();
                res.send(updatedMember);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//display our members list
router.get('/membersList', function (req, res) {
    Member.find({}, function (err, members) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(members);
    });
});
//protecting the profile route for members
app.get('/api/member/profile', verifyToken, function (req, res) {
    res.send({ success: true, data: req.member });
});
app.use('/api/users', router);
