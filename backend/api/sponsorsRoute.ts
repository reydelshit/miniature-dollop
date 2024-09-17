import { Request, Response, Router } from 'express';
import sql from 'mssql';
import { connectionConfig } from '../connections/connectionConfig';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await sql.connect(connectionConfig);
    const request = new sql.Request(pool);

    const query = 'SELECT * FROM MTR_DEALER';
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err: any) {
    console.error('Dealer fetch failed:', err);
    res.status(500).json({
      message: 'Dealer fetch failed',
      error: err.message,
      details: err.stack,
    });
  }
});

export const sponsorsRouter = router;
