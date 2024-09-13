"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var msnodesqlv8_1 = require("mssql/msnodesqlv8");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8800;
var SECRET_KEY = 'REYDEL';
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.listen(PORT, function () {
    console.log("Server is running on PORT ".concat(PORT));
});
var config = {
    server: "REYDELSHIT",
    database: "LIVEWELL",
    options: {
        trustedConnection: true, // Set to true if using Windows Authentication
        trustServerCertificate: true, // Set to true if using self-signed certificates
    },
    driver: "msnodesqlv8", // Required if using Windows Authentication
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, msnodesqlv8_1.default.connect(config)];
            case 1:
                _a.sent();
                return [4 /*yield*/, msnodesqlv8_1.default.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["select TOP 10 * from MyTable"], ["select TOP 10 * from MyTable"])))];
            case 2:
                result = _a.sent();
                console.dir(result);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
var templateObject_1;
// app.get('/test-connection', (req, res) => {
//     connectToDatabase()
//         .then(() => res.json({ message: 'Connection successful' }))
//         .catch(err => {
//             console.error('Connection test failed:', err);
//             res.status(500).json({ 
//                 message: 'Connection test failed', 
//                 error: err.message,
//                 details: err.stack
//             });
//         });
// });
// // test test lang ig gumagana ba yung connection sa database 
// app.get('/register', (req: Request, res: Response) => {
//   connectToDatabase()
//       .then(async (pool) => {
//           try {
//               const query = 'SELECT * FROM MTR_REGISTRATION';
//               const result = await pool.request().query(query);
//               res.json(result.recordset);
//           } catch (err: any) {
//               throw err; 
//           }
//       })
//       .catch(err => {
//           console.error('Register operation failed:', err);
//           res.status(500).json({ 
//               message: 'Register operation failed', 
//               error: err.message,
//               details: err.stack
//           });
//       });
// });
// // LOGIN API 
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       const token = jwt.sign({ userId: user.userId, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//       res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
//       return res.json({ message: 'Login successful', token: token });
//   }
//   res.status(401).json({ message: 'Invalid credentials' });
// });
// // VALIDATE TOKEN 
// const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;
//     if (!token) return res.sendStatus(401);
//     jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: unknown) => {
//         if (err) return res.sendStatus(403);
//         const user = decoded as UserPayload;
//         req.user = user;
//         next();
//     });
// }
// app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });
