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
exports.loginRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const connectionConfig_1 = require("../connections/connectionConfig");
const router = (0, express_1.Router)();
const SECRET_KEY = 'livewell@2024';
// LOGIN API
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    let pool = null;
    try {
        pool = yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const request = new msnodesqlv8_1.default.Request(pool);
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
            const token = jsonwebtoken_1.default.sign({ userId: user.Code, username: user.EmailAddress }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
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
    if (!token)
        return res.json({
            isAuthenticated: false,
            message: 'Token not found',
            status: 401,
        });
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        const user = decoded;
        req.user = user;
        next();
    });
};
router.get('/check', authenticateToken, (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
});
exports.loginRouter = router;
