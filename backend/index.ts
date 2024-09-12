import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
// import { studentRouter } from './api/studentRoute';
// import { attendanceRouter } from './api/attendanceRoute';
// import { messageRouter } from './api/messagesRoute';
// import { dashboardRouter } from './api/dashboardRoute';

import { connectToDatabase } from './connections/DatabaseConnection';



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
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// console.log('Serving static files from:', path.join(__dirname, 'uploads'));




app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});



app.get('/test-connection', (req, res) => {
    connectToDatabase()
        .then(() => res.json({ message: 'Connection successful' }))
        .catch(err => {
            console.error('Connection test failed:', err);
            res.status(500).json({ 
                message: 'Connection test failed', 
                error: err.message,
                details: err.stack
            });
        });
});

app.get('/register', (req, res) => {
    const query = 'SELECT * FROM MTR_REGISTRATION';

    connectToDatabase().then(pool => {
        return pool.request().query(query);
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Database operation failed', 
            error: err.message,
            details: err.stack
        });
    });
});


// // LOGIN API 
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       const token = jwt.sign({ userId: user.userId, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//       res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
//       return res.json({ message: 'Login successful', token: token });
//   }
//   res.status(401).json({ message: 'Invalid credentials' });
// });

// // VALIDATE TOKEN 
// const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;

//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: unknown) => {
//         if (err) return res.sendStatus(403);
        
//         const user = decoded as UserPayload;
//         req.user = user;
//         next();
//     });
// }


// app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });






