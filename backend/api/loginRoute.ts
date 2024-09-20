import { NextFunction, Request, Response, Router } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { connectionConfig } from '../connections/connectionConfig';

// change to import sql from 'mssql' when deploying
// import sql from 'mssql';
import sql from 'mssql/msnodesqlv8';
import { AuthenticatedRequest, UserPayload } from '../types/auth';

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET as string;

// LOGIN API
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(connectionConfig);
    const request = new sql.Request();

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
      console.log(user, 'user');
      const token = jwt.sign(
        { userId: user.Code, username: user.EmailAddress },
        SECRET_KEY,
        { expiresIn: '1h' },
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD' ? true : false,
        sameSite: process.env.NODE_ENV === 'PROD' ? 'none' : 'lax',
      });
      return res.json({ message: 'Login successful', token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
});

// VALIDATE TOKEN
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
      message: 'Token not found',
      status: 401,
    });
  }

  jwt.verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, decoded: unknown) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(403).json({
          isAuthenticated: false,
          message: 'Invalid token',
          status: 403,
        });
      }

      req.user = decoded as UserPayload;
      next();
    },
  );
};

router.get('/check', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

export const loginRouter = router;
