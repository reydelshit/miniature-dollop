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
exports.registerRouter = void 0;
const express_1 = require("express");
const mssql_1 = __importDefault(require("mssql"));
const multer_1 = __importDefault(require("multer"));
const connectionConfig_1 = require("../connections/connectionConfig");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// fetch all register
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('fetching all registrations');
    let pool = null;
    try {
        pool = yield mssql_1.default.connect(connectionConfig_1.connectionConfig);
        const request = new mssql_1.default.Request(pool);
        const query = `
        SELECT * FROM MTR_REGISTRATION
        ORDER BY DateRegister DESC
      `;
        const result = yield request.query(query);
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error retrieving registrations:', err);
        if (!res.headersSent) {
            res
                .status(500)
                .json({ message: 'An error occurred while retrieving registrations' });
        }
    }
    finally {
        if (pool) {
            yield pool.close();
        }
    }
}));
router.post('/post', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pool = null;
    try {
        // Connect to the database
        pool = yield mssql_1.default.connect(connectionConfig_1.connectionConfig);
        // Get the latest Code
        const querySelect = 'SELECT ACCOUNTNO FROM MTR_SYSTEM_CONFIG';
        const resultSelect = yield pool.request().query(querySelect);
        const prefixNumber = resultSelect.recordset[0].ACCOUNTNO.toString().substr(0, 6);
        console.log(prefixNumber, 'prefixNumber');
        const addLeadingZero = (text, targetLength) => {
            return text.toString().padStart(targetLength, '0');
        };
        const postFixNumber = parseInt(resultSelect.recordset[0].ACCOUNTNO.toString().substr(7, 8)) +
            1;
        console.log(postFixNumber, 'postFixNumber');
        const newCode = addLeadingZero(postFixNumber.toString(), 8);
        const accountNumber = `${prefixNumber}-${newCode}`;
        // Extract data from request body
        const { lastName, firstName, middleInitial, address, contactNumber, emailAddress, status, isCreatedOnline, SponsorID, userPassword, } = req.body;
        const dateRegister = new Date().toISOString();
        // INSERT query
        const queryInsert = `
        INSERT INTO MTR_REGISTRATION 
        (Code, SponsorID, LastName, FirstName, MiddleInitial, Address, ContactNumber, EmailAddress, DateRegister, Status, isCreatedOnline, UserPassword)
        OUTPUT INSERTED.Code, INSERTED.ControlNo
        VALUES (@Code, @SponsorID, @LastName, @FirstName, @MiddleInitial, @Address, @ContactNumber, @EmailAddress, @DateRegister, @Status, @isCreatedOnline, @UserPassword)
      `;
        // Create a new request object and add parameters
        const request = pool.request();
        request.input('Code', mssql_1.default.VarChar, accountNumber);
        request.input('SponsorID', mssql_1.default.VarChar, SponsorID);
        request.input('LastName', mssql_1.default.VarChar, lastName);
        request.input('FirstName', mssql_1.default.VarChar, firstName);
        request.input('MiddleInitial', mssql_1.default.VarChar, middleInitial);
        request.input('Address', mssql_1.default.VarChar, address);
        request.input('ContactNumber', mssql_1.default.VarChar, contactNumber);
        request.input('EmailAddress', mssql_1.default.VarChar, emailAddress);
        request.input('DateRegister', mssql_1.default.DateTime, dateRegister);
        request.input('Status', mssql_1.default.VarChar, status);
        request.input('isCreatedOnline', mssql_1.default.Char(1), isCreatedOnline);
        request.input('UserPassword', mssql_1.default.VarChar, userPassword);
        // Execute the query
        const resultInsert = yield request.query(queryInsert);
        // Send the response
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            code: resultInsert.recordset[0].Code,
            controlNo: resultInsert.recordset[0].ControlNo,
        });
        const queryUpdate = 'UPDATE MTR_SYSTEM_CONFIG SET ACCOUNTNO = @newCode';
        const requestUpdate = pool.request();
        requestUpdate.input('newCode', mssql_1.default.VarChar, accountNumber);
        yield requestUpdate.query(queryUpdate);
    }
    catch (err) {
        console.error('Registration failed:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during registration',
        });
    }
    finally {
        if (pool) {
            yield pool.close();
        }
    }
}));
exports.registerRouter = router;
