import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import multer from 'multer';
// import { studentRouter } from './api/studentRoute';
// import { attendanceRouter } from './api/attendanceRoute';
// import { messageRouter } from './api/messagesRoute';
// import { dashboardRouter } from './api/dashboardRoute';

import { executeQuery } from './connections/QueryConnection';

import sql from 'mssql/msnodesqlv8';

interface UserPayload extends JwtPayload {
    userId?: number;
    username: string;
}

interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8800;
const upload = multer();
const SECRET_KEY = 'REYDEL'; 

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const config = {
  server: "REYDELSHIT",
  database: "LIVEWELL",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: "msnodesqlv8",
};

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

// app.get('/', async (req: Request, res: Response) => {
//   let pool: sql.ConnectionPool | null = null;
//   try {
//     pool = await connectToDatabase();
//     res.json({ message: 'Database connection successful' });
//   } catch (err: any) {
//     console.error('Operation failed:', err);
//     if (!res.headersSent) {
//       res.status(500).json({ 
//         message: 'Database connection failed', 
//         error: err.message
//       });
//     }
//   } finally {
//     if (pool) {
//       await pool.close();
//     }
//   }
// });

// fetch sponsors 

app.get('/sponsors', async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM MTR_DEALER';
    const result = await executeQuery('GET', query);
    res.json(result);
  } catch (err: any) {
    console.error('Dealer fetch failed:', err);
    res.status(500).json({ 
      message: 'Dealer fetch failed', 
      error: err.message,
      details: err.stack
    });
  }
});



// fetch all register
app.get('/register', async (req: express.Request, res: express.Response) => {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await sql.connect(config);
    const request = new sql.Request(pool);

    const query = `
      SELECT * FROM MTR_REGISTRATION
      ORDER BY DateRegister DESC
    `;

    const result = await request.query(query);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving registrations:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'An error occurred while retrieving registrations' });
    }
  } finally {
    if (pool) {
      await pool.close();
    }
  }
});



app.post('/register', upload.none(), async (req: express.Request, res: express.Response) => {
  let pool: sql.ConnectionPool | null = null;
  try {
    // Connect to the database
    pool = await sql.connect(config);

    // Get the latest Code
    const querySelect = 'SELECT ACCOUNTNO FROM MTR_SYSTEM_CONFIG';
    const resultSelect = await pool.request().query(querySelect);
    const prefixNumber = resultSelect.recordset[0].ACCOUNTNO.toString().substr(0, 6);
    console.log(prefixNumber, 'prefixNumber');

    const addLeadingZero = (text: string, targetLength: number)  => {
      return text.toString().padStart(targetLength, '0');
    }

    const postFixNumber = parseInt(resultSelect.recordset[0].ACCOUNTNO.toString().substr(7, 8)) + 1;
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
      userPassword
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
    const request = pool.request();
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


    // Execute the query
    const resultInsert = await request.query(queryInsert);

    // Send the response
    res.status(201).json({ 
      status: 'success',
      message: 'Registration successful', 
      code: resultInsert.recordset[0].Code,
      controlNo: resultInsert.recordset[0].ControlNo
    });

    const queryUpdate = 'UPDATE MTR_SYSTEM_CONFIG SET ACCOUNTNO = @newCode';
    const requestUpdate = pool.request();
    requestUpdate.input('newCode', sql.VarChar, accountNumber);
    await requestUpdate.query(queryUpdate)


  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ status: 'error', message: 'An error occurred during registration' });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});






