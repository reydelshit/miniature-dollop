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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connectionConfig_1 = require("./connections/connectionConfig");
const loginRoute_1 = require("./api/loginRoute");
const registerRoutes_1 = require("./api/registerRoutes");
const sponsorsRoute_1 = require("./api/sponsorsRoute");
// change to import sql from 'mssql' when deploying
// import sql from 'mssql';
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const productRoute_1 = require("./api/productRoute");
const cartRoute_1 = require("./api/cartRoute");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8800;
console.log('NODE_ENV in Vercel:', process.env.NODE_ENV);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'PROD'
        ? process.env.PROD_CLIENT_URL
        : process.env.LOCAL_CLIENT_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'PROD'
        ? process.env.PROD_CLIENT_URL
        : process.env.LOCAL_CLIENT_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
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
app.use('/product', productRoute_1.productRouter);
app.use('/cart', cartRoute_1.cartRouter);
app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
});
app.use((req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});
exports.default = app;
