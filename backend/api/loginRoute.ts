import { NextFunction, Request, Response, Router } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import sql from 'mssql';
import { connectionConfig } from '../connections/connectionConfig';

const router = Router();
const SECRET_KEY = 'livewell@2024';

interface UserPayload extends JwtPayload {
  userId?: number;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

// LOGIN API
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await sql.connect(connectionConfig);
    const request = new sql.Request(pool);

    const query =
      'SELECT * FROM MTR_REGISTRATION WHERE EmailAddress = @EmailAddress  AND UserPassword = @UserPassword';
    const queryInsert = {
      username: username,
      password: password,
    };

    request.input('EmailAddress', sql.VarChar, queryInsert.username);
    request.input('UserPassword', sql.VarChar, queryInsert.password);

    const result = await request.query(query);
    const users = result.recordset;

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    if (user) {
      const token = jwt.sign(
        { userId: user.Code, username: user.EmailAddress },
        SECRET_KEY,
        { expiresIn: '1h' },
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return res.json({ message: 'Login successful', token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
});

// VALIDATE TOKEN
const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token)
    return res.json({
      isAuthenticated: false,
      message: 'Token not found',
      status: 401,
    });

  jwt.verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, decoded: unknown) => {
      if (err) return res.sendStatus(403);

      const user = decoded as UserPayload;
      req.user = user;
      next();
    },
  );
};

router.get('/check', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

export const loginRouter = router;
