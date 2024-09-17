import { connectToDatabase } from '..';

type Operation = 'GET' | 'POST' | 'PUT' | 'DELETE';

// const sqlConfig: sql.config = {
//   user: 'lvsysadd',
//   password: 'Livewellsysad@123',
//   database: 'livewellmarketi_LIVEWELLDATA',
//   server: '112.109.83.71',
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },

// };

export async function executeQuery(
  operation: Operation,
  query: string,
  params?: any[],
) {
  const pool = await connectToDatabase();
  let request = pool.request();

  if (params) {
    params.forEach((param, index) => {
      request = request.input(`param${index}`, param);
    });
  }
  let result;
  try {
    switch (operation.toLowerCase()) {
      case 'get':
        result = await request.query(query);
        return result.recordset;
      case 'post':
        result = await request.query(query);
        return result.rowsAffected;

      case 'put':
      case 'update':
      case 'delete':
        result = await request.query(query);
        return result.rowsAffected;
      default:
        throw new Error('Unsupported operation');
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await pool.close();
  }
}
