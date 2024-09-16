import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { connectionConfig } from './connections/connectionConfig';

import sql from 'mssql/msnodesqlv8';
import { loginRouter } from './api/loginRoute';
import { registerRouter } from './api/registerRoutes';
import { sponsorsRouter } from './api/sponsorsRoute';

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
export const handler = app;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(connectionConfig);
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/sponsors', sponsorsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
