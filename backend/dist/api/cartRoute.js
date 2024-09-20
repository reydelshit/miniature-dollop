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
exports.cartRouter = void 0;
const express_1 = require("express");
// import sql from 'mssql';
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
const multer_1 = __importDefault(require("multer"));
const connectionConfig_1 = require("../connections/connectionConfig");
const loginRoute_1 = require("./loginRoute");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Fetch all carts
router.get('/', loginRoute_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Fetching all carts');
    try {
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!user_id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user' });
        }
        const request = new msnodesqlv8_1.default.Request();
        const query = `
      SELECT MTR_Stock.description, MTR_Stock.image, MTR_Stock.StockCode,  POS_CART.* FROM POS_CART INNER JOIN MTR_Stock ON POS_CART.product_id = MTR_Stock.RecNo  WHERE user_id = @user_id ORDER BY date_created DESC
    `;
        request.input('user_id', msnodesqlv8_1.default.NVarChar, user_id);
        const result = yield request.query(query);
        console.log('Retrieved carts:', result.recordset);
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error retrieving registrations:', err);
        if (!res.headersSent) {
            res.status(500).json({
                message: 'An error occurred while retrieving registrations',
            });
        }
    }
}));
router.post('/post', upload.none(), loginRoute_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const { quantity, price, product_id } = req.body;
        const dateRegister = new Date().toISOString();
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log(user_id, 'user');
        if (!user_id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user' });
        }
        const querySelect = 'SELECT * FROM POS_CART WHERE user_id = @user_id AND product_id = @product_id';
        const requestSelect = new msnodesqlv8_1.default.Request();
        requestSelect.input('user_id', msnodesqlv8_1.default.NVarChar, user_id);
        requestSelect.input('product_id', msnodesqlv8_1.default.NVarChar, product_id);
        const resultSelect = yield requestSelect.query(querySelect);
        if (resultSelect.recordset.length > 0) {
            const cartItem = resultSelect.recordset[0];
            const newQuantity = cartItem.quantity + 1;
            const queryUpdate = `
        UPDATE POS_CART
        SET quantity = @quantity
        WHERE cart_id = @cart_id
      `;
            const requestUpdate = new msnodesqlv8_1.default.Request(); // Create a new request for the update
            requestUpdate.input('quantity', msnodesqlv8_1.default.Int, newQuantity);
            requestUpdate.input('cart_id', msnodesqlv8_1.default.Int, cartItem.cart_id);
            const resultUpdate = yield requestUpdate.query(queryUpdate); // Use requestUpdate here
            if (resultUpdate.rowsAffected[0] > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'Cart qty updated successfully',
                });
            }
            else {
                res.status(404).json({
                    status: 'error',
                    message: 'Cart update failed: Cart item not found',
                });
            }
            return;
        }
        // INSERT query
        const queryInsert = `
        INSERT INTO POS_CART
        (quantity, price, user_id, date_created, product_id)
        VALUES (@quantity, @price, @user_id, @date_created, @product_id)
      `;
        const request = new msnodesqlv8_1.default.Request();
        request.input('quantity', msnodesqlv8_1.default.Int, quantity);
        request.input('price', msnodesqlv8_1.default.Numeric, price);
        request.input('user_id', msnodesqlv8_1.default.NVarChar, user_id);
        request.input('date_created', msnodesqlv8_1.default.Date, dateRegister);
        request.input('product_id', msnodesqlv8_1.default.NVarChar, product_id);
        const resultInsert = yield request.query(queryInsert);
        console.log('Inserting to cart:', resultInsert);
        // Send the response
        res.status(201).json({
            status: 'success',
            message: 'Add to cart successful',
        });
    }
    catch (err) {
        console.error('Add to cart failed:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during registration',
        });
    }
}));
router.put('/update', loginRoute_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield msnodesqlv8_1.default.connect(connectionConfig_1.connectionConfig);
        const { cart_id, quantity } = req.body;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!user_id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user' });
        }
        // UPDATE query
        const queryUpdate = `
        UPDATE POS_CART
        SET quantity = @quantity
        WHERE cart_id = @cart_id
      `;
        const request = new msnodesqlv8_1.default.Request();
        request.input('cart_id', msnodesqlv8_1.default.NVarChar, cart_id);
        request.input('quantity', msnodesqlv8_1.default.Int, quantity);
        const resultUpdate = yield request.query(queryUpdate);
        if (resultUpdate.rowsAffected[0] > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Cart qty updated successfully',
            });
        }
        else {
            res.status(404).json({
                status: 'error',
                message: 'Cart update failed: Cart item not found',
            });
        }
    }
    catch (err) {
        console.error('Cart update failed:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during update',
        });
    }
}));
exports.cartRouter = router;
