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
exports.connectToDatabase = connectToDatabase;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connectionConfig_1 = require("./connections/connectionConfig");
const loginRoute_1 = require("./api/loginRoute");
const registerRoutes_1 = require("./api/registerRoutes");
const sponsorsRoute_1 = require("./api/sponsorsRoute");
// change to import sql from 'mssql' when deploying
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8800;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'PROD'
        ? process.env.BACKEND_URL
        : process.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
            console.log('Database connected successfully');
            return pool;
        }
        catch (err) {
            console.error('Database connection failed:', err);
            throw err;
        }
    });
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/sponsors', sponsorsRoute_1.sponsorsRouter);
app.use('/register', registerRoutes_1.registerRouter);
app.use('/login', loginRoute_1.loginRouter);
app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        // secure: true,
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
});
app.use((req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});
exports.default = app;
