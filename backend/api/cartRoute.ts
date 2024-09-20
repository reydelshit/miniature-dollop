import express, { NextFunction, Router, Response, Request } from 'express';
// import sql from 'mssql';
import sql from 'mssql/msnodesqlv8';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import multer from 'multer';
import { connectionConfig } from '../connections/connectionConfig';
import { authenticateToken } from './loginRoute';
import { AuthenticatedRequest } from '../types/auth';
const router = Router();
const upload = multer();

// Fetch all carts
router.get(
  '/',
  authenticateToken,
  async (req: AuthenticatedRequest, res: express.Response) => {
    console.log('Fetching all carts');

    try {
      await sql.connect(connectionConfig);

      const user_id = req.user?.userId;

      if (!user_id) {
        return res.status(401).json({ message: 'Unauthorized: Invalid user' });
      }

      const request = new sql.Request();
      const query = `
      SELECT MTR_Stock.description, MTR_Stock.image, MTR_Stock.StockCode,  POS_CART.* FROM POS_CART INNER JOIN MTR_Stock ON POS_CART.product_id = MTR_Stock.RecNo  WHERE user_id = @user_id ORDER BY date_created DESC
    `;

      request.input('user_id', sql.NVarChar, user_id);

      const result = await request.query(query);

      console.log('Retrieved carts:', result.recordset);

      res.json(result.recordset);
    } catch (err) {
      console.error('Error retrieving registrations:', err);
      if (!res.headersSent) {
        res.status(500).json({
          message: 'An error occurred while retrieving registrations',
        });
      }
    }
  },
);

router.post(
  '/post',
  upload.none(),
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await sql.connect(connectionConfig);

      const { quantity, price, product_id } = req.body;
      const dateRegister = new Date().toISOString();

      const user_id = req.user?.userId;

      console.log(user_id, 'user');

      if (!user_id) {
        return res.status(401).json({ message: 'Unauthorized: Invalid user' });
      }

      const querySelect =
        'SELECT * FROM POS_CART WHERE user_id = @user_id AND product_id = @product_id';

      const requestSelect = new sql.Request();
      requestSelect.input('user_id', sql.NVarChar, user_id);
      requestSelect.input('product_id', sql.NVarChar, product_id);

      const resultSelect = await requestSelect.query(querySelect);

      if (resultSelect.recordset.length > 0) {
        const cartItem = resultSelect.recordset[0];
        const newQuantity = cartItem.quantity + 1;

        const queryUpdate = `
        UPDATE POS_CART
        SET quantity = @quantity
        WHERE cart_id = @cart_id
      `;

        const requestUpdate = new sql.Request(); // Create a new request for the update
        requestUpdate.input('quantity', sql.Int, newQuantity);
        requestUpdate.input('cart_id', sql.Int, cartItem.cart_id);

        const resultUpdate = await requestUpdate.query(queryUpdate); // Use requestUpdate here

        if (resultUpdate.rowsAffected[0] > 0) {
          res.status(200).json({
            status: 'success',
            message: 'Cart qty updated successfully',
          });
        } else {
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

      const request = new sql.Request();
      request.input('quantity', sql.Int, quantity);
      request.input('price', sql.Numeric, price);
      request.input('user_id', sql.NVarChar, user_id);
      request.input('date_created', sql.Date, dateRegister);
      request.input('product_id', sql.NVarChar, product_id);

      const resultInsert = await request.query(queryInsert);

      console.log('Inserting to cart:', resultInsert);

      // Send the response
      res.status(201).json({
        status: 'success',
        message: 'Add to cart successful',
      });
    } catch (err) {
      console.error('Add to cart failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred during registration',
      });
    }
  },
);

router.put(
  '/update',
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await sql.connect(connectionConfig);

      const { cart_id, quantity } = req.body;

      const user_id = req.user?.userId;

      if (!user_id) {
        return res.status(401).json({ message: 'Unauthorized: Invalid user' });
      }

      // UPDATE query
      const queryUpdate = `
        UPDATE POS_CART
        SET quantity = @quantity
        WHERE cart_id = @cart_id
      `;

      const request = new sql.Request();
      request.input('cart_id', sql.NVarChar, cart_id);
      request.input('quantity', sql.Int, quantity);

      const resultUpdate = await request.query(queryUpdate);

      if (resultUpdate.rowsAffected[0] > 0) {
        res.status(200).json({
          status: 'success',
          message: 'Cart qty updated successfully',
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Cart update failed: Cart item not found',
        });
      }
    } catch (err) {
      console.error('Cart update failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred during update',
      });
    }
  },
);

export const cartRouter = router;
