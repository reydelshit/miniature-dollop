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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = exports.authenticateToken = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connectionConfig_1 = require("../connections/connectionConfig");
// change to import sql from 'mssql' when deploying
// import sql from 'mssql';
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const router = (0, express_1.Router)();
const SECRET_KEY = process.env.JWT_SECRET;
// LOGIN API
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const request = new msnodesqlv8_1.default.Request();
        const query = 'SELECT * FROM MTR_REGISTRATION WHERE EmailAddress = @EmailAddress  AND UserPassword = @UserPassword';
        const queryInsert = {
            username: username,
            password: password,
        };
        request.input('EmailAddress', msnodesqlv8_1.default.VarChar, queryInsert.username);
        request.input('UserPassword', msnodesqlv8_1.default.VarChar, queryInsert.password);
        const result = yield request.query(query);
        const users = result.recordset;
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = users[0];
        if (user) {
            console.log(user, 'user');
            const token = jsonwebtoken_1.default.sign({ userId: user.Code, username: user.EmailAddress }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PROD' ? true : false,
                sameSite: process.env.NODE_ENV === 'PROD' ? 'none' : 'lax',
            });
            return res.json({ message: 'Login successful', token: token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging in' });
    }
}));
// VALIDATE TOKEN
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Token not found',
            status: 401,
        });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({
                isAuthenticated: false,
                message: 'Invalid token',
                status: 403,
            });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
router.get('/check', exports.authenticateToken, (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
});
exports.loginRouter = router;
