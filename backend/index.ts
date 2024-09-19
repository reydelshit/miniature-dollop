import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';

import express, { Express } from 'express';
import { connectionConfig } from './connections/connectionConfig';
import { loginRouter } from './api/loginRoute';
import { registerRouter } from './api/registerRoutes';
import { sponsorsRouter } from './api/sponsorsRoute';

// change to import sql from 'mssql' when deploying
import sql from 'mssql';

const app: Express = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'PROD'
        ? process.env.PROD_CLIENT_URL
        : process.env.LOCAL_CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://miniature-dollop-omega.vercel.app',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(connectionConfig);
    console.log('Database connected successfully');
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

app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PROD',
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
});

app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

export default app;
