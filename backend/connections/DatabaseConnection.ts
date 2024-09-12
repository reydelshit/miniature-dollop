import sql, { ConnectionPool } from 'mssql';

let poolPromise: Promise<ConnectionPool> | undefined;

const sqlConfig: sql.config = {
  user: 'lvsysadd', 
  password: 'Livewellsysad@123', 
  database: 'livewellmarketi_LIVEWELLDATA',
  server: '112.109.83.71', 
  options: {
    encrypt: true,
    trustServerCertificate: true, 
  },
  pool: {
    // connectionTimeout: 30000, 
  }
};

async function connectToDatabase(): Promise<ConnectionPool> {
  if (!poolPromise) {
    console.log("Attempting to connect to the database...");
    poolPromise = sql.connect(sqlConfig);
  }
  return poolPromise;
}

export { connectToDatabase };