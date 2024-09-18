import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectionConfig } from './connections/connectionConfig';
import { loginRouter } from './api/loginRoute';
import { registerRouter } from './api/registerRoutes';
import { sponsorsRouter } from './api/sponsorsRoute';

// change to import sql from 'mssql' when deploying
import sql from 'mssql/msnodesqlv8';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'PROD'
        ? process.env.BACKEND_URL
        : process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

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
    // secure: true,
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
});

app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

export default app;
