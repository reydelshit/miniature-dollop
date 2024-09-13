import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
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

// Define the root route
app.get('/', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.json({ message: 'Database connection successful' });
  } catch (err: any) {
    console.error('Operation failed:', err);
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: err.message,
      details: err.stack
    });
  } finally {
    const pool = await connectToDatabase();
    await pool.close();
  }
});


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
app.get('/register', async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM MTR_REGISTRATION';
    const result = await executeQuery('GET', query);
    res.json(result);
  } catch (err: any) {
    console.error('Register fetch failed:', err);
    res.status(500).json({ 
      message: 'Register fetch failed', 
      error: err.message,
      details: err.stack
    });
  }
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    // Get the latest Code from the MTR_REGISTRATION table
    const querySelect = 'SELECT TOP 1 Code FROM MTR_REGISTRATION ORDER BY Code DESC';
    const result = await executeQuery('GET', querySelect);

    const latestId = result.length > 0 ? result[0].Code : 0;
    const newId = latestId + 1;

    // Extract data from the request body
    const { lastName, firstName, sponsorID, middleInitial, address, contactNumber, emailAddress, status, isOnline } = req.body;
    const dateRegister = new Date().toISOString();

    // Prepare the INSERT query with parameterized values
    const queryInsert = `
      INSERT INTO MTR_REGISTRATION 
      (Code, SponsorID, LastName, FirstName, MiddleInitial, Address, ContactNumber, EmailAddress, DateRegister, Status, isOnline)
      VALUES (@param0, @param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8, @param9, @param10)
    `;

    // Create params array
    const params = [
      newId,
      sponsorID,
      lastName,
      firstName,
      middleInitial,
      address,
      contactNumber,
      emailAddress,
      dateRegister,
      status,
      isOnline
    ];

    // Execute the INSERT query with the params
    const resultInsert = await executeQuery('POST', queryInsert, params);

    res.json({
      message: 'Register post successful',
      result: resultInsert,
    });

  } catch (err: any) {
    console.error('Register post failed:', err);
    res.status(500).json({
      message: 'Register post failed',
      error: err.message,
      details: err.stack
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});






