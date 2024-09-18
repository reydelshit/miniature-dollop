import express, { Router } from 'express';
import sql from 'mssql/msnodesqlv8';
import multer from 'multer';
import { connectionConfig } from '../connections/connectionConfig';
const router = Router();
const upload = multer();

// Fetch all registrations
router.get('/', async (req: express.Request, res: express.Response) => {
  console.log('Fetching all registrations');

  try {
    await sql.connect(connectionConfig);

    const request = new sql.Request();
    const query = `
      SELECT * FROM MTR_REGISTRATION
      ORDER BY DateRegister DESC
    `;

    const result = await request.query(query);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving registrations:', err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: 'An error occurred while retrieving registrations' });
    }
  }
});

router.post(
  '/post',
  upload.none(),
  async (req: express.Request, res: express.Response) => {
    try {
      // Use the global connection pool
      await sql.connect(connectionConfig);

      // Get the latest Code
      const querySelect = 'SELECT ACCOUNTNO FROM MTR_SYSTEM_CONFIG';
      const resultSelect = await sql.query(querySelect); // Using global pool for queries
      const prefixNumber =
        resultSelect.recordset[0].ACCOUNTNO.toString().substr(0, 6);
      console.log(prefixNumber, 'prefixNumber');

      const addLeadingZero = (text: string, targetLength: number) => {
        return text.toString().padStart(targetLength, '0');
      };

      const postFixNumber =
        parseInt(resultSelect.recordset[0].ACCOUNTNO.toString().substr(7, 8)) +
        1;
      console.log(postFixNumber, 'postFixNumber');

      const newCode = addLeadingZero(postFixNumber.toString(), 8);
      const accountNumber = `${prefixNumber}-${newCode}`;

      // Extract data from request body
      const {
        lastName,
        firstName,
        middleInitial,
        address,
        contactNumber,
        emailAddress,
        status,
        isCreatedOnline,
        SponsorID,
        userPassword,
      } = req.body;

      const dateRegister = new Date().toISOString();

      // INSERT query
      const queryInsert = `
        INSERT INTO MTR_REGISTRATION
        (Code, SponsorID, LastName, FirstName, MiddleInitial, Address, ContactNumber, EmailAddress, DateRegister, Status, isCreatedOnline, UserPassword)
        OUTPUT INSERTED.Code, INSERTED.ControlNo
        VALUES (@Code, @SponsorID, @LastName, @FirstName, @MiddleInitial, @Address, @ContactNumber, @EmailAddress, @DateRegister, @Status, @isCreatedOnline, @UserPassword)
      `;

      // Create a new request object and add parameters
      const request = new sql.Request();
      request.input('Code', sql.VarChar, accountNumber);
      request.input('SponsorID', sql.VarChar, SponsorID);
      request.input('LastName', sql.VarChar, lastName);
      request.input('FirstName', sql.VarChar, firstName);
      request.input('MiddleInitial', sql.VarChar, middleInitial);
      request.input('Address', sql.VarChar, address);
      request.input('ContactNumber', sql.VarChar, contactNumber);
      request.input('EmailAddress', sql.VarChar, emailAddress);
      request.input('DateRegister', sql.DateTime, dateRegister);
      request.input('Status', sql.VarChar, status);
      request.input('isCreatedOnline', sql.Char(1), isCreatedOnline);
      request.input('UserPassword', sql.VarChar, userPassword);

      // Execute the insert query
      const resultInsert = await request.query(queryInsert);

      // Send the response
      res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        code: resultInsert.recordset[0].Code,
        controlNo: resultInsert.recordset[0].ControlNo,
      });

      // Update the account number in the system config
      const queryUpdate = 'UPDATE MTR_SYSTEM_CONFIG SET ACCOUNTNO = @newCode';
      const requestUpdate = new sql.Request();
      requestUpdate.input('newCode', sql.VarChar, accountNumber);
      await requestUpdate.query(queryUpdate);
    } catch (err) {
      console.error('Registration failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred during registration',
      });
    }
  },
);

export const registerRouter = router;
