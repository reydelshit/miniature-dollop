import { Request, Response, Router } from 'express';
import { connectionConfig } from '../connections/connectionConfig';

// change to import sql from 'mssql' when deploying
// import sql from 'mssql';

import sql from 'mssql/msnodesqlv8';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await sql.connect(connectionConfig);
    const request = new sql.Request();

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
