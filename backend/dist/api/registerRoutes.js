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
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const multer_1 = __importDefault(require("multer"));
const connectionConfig_1 = require("../connections/connectionConfig");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Fetch all registrations
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching all registrations');
    try {
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const request = new msnodesqlv8_1.default.Request();
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
}));
router.post('/post', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the global connection pool
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        // Get the latest Code
        const querySelect = 'SELECT ACCOUNTNO FROM MTR_SYSTEM_CONFIG';
        const resultSelect = yield msnodesqlv8_1.default.query(querySelect); // Using global pool for queries
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
        const request = new msnodesqlv8_1.default.Request();
        request.input('Code', msnodesqlv8_1.default.VarChar, accountNumber);
        request.input('SponsorID', msnodesqlv8_1.default.VarChar, SponsorID);
        request.input('LastName', msnodesqlv8_1.default.VarChar, lastName);
        request.input('FirstName', msnodesqlv8_1.default.VarChar, firstName);
        request.input('MiddleInitial', msnodesqlv8_1.default.VarChar, middleInitial);
        request.input('Address', msnodesqlv8_1.default.VarChar, address);
        request.input('ContactNumber', msnodesqlv8_1.default.VarChar, contactNumber);
        request.input('EmailAddress', msnodesqlv8_1.default.VarChar, emailAddress);
        request.input('DateRegister', msnodesqlv8_1.default.DateTime, dateRegister);
        request.input('Status', msnodesqlv8_1.default.VarChar, status);
        request.input('isCreatedOnline', msnodesqlv8_1.default.Char(1), isCreatedOnline);
        request.input('UserPassword', msnodesqlv8_1.default.VarChar, userPassword);
        // Execute the insert query
        const resultInsert = yield request.query(queryInsert);
        // Send the response
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            code: resultInsert.recordset[0].Code,
            controlNo: resultInsert.recordset[0].ControlNo,
        });
        // Update the account number in the system config
        const queryUpdate = 'UPDATE MTR_SYSTEM_CONFIG SET ACCOUNTNO = @newCode';
        const requestUpdate = new msnodesqlv8_1.default.Request();
        requestUpdate.input('newCode', msnodesqlv8_1.default.VarChar, accountNumber);
        yield requestUpdate.query(queryUpdate);
    }
    catch (err) {
        console.error('Registration failed:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during registration',
        });
    }
}));
exports.registerRouter = router;
