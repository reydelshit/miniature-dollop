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
exports.sponsorsRouter = void 0;
const express_1 = require("express");
const connectionConfig_1 = require("../connections/connectionConfig");
// change to import sql from 'mssql' when deploying
const mssql_1 = __importDefault(require("mssql"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mssql_1.default.connect(connectionConfig_1.connectionConfig);
        const request = new mssql_1.default.Request();
        const query = 'SELECT * FROM MTR_DEALER';
        const result = yield request.query(query);
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Dealer fetch failed:', err);
        res.status(500).json({
            message: 'Dealer fetch failed',
            error: err.message,
            details: err.stack,
        });
    }
}));
exports.sponsorsRouter = router;
