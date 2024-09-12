// import mysql from 'mysql';


// const databaseConnection: mysql.Connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'qr-code-monitoring',
//   });
  

import * as sql from 'mssql';

const connectionString = 'Server=112.109.83.71;Database=livewellmarketi_LIVEWELLDATA;User Id=lvsysadd;Password=Livewellsysad@123;Encrypt=true;TrustServerCertificate=true;Connection Timeout=30;';


async function connectToDatabase() {
  try {
    const pool = await sql.connect(connectionString);
    console.log('Connected to the database');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

  
export { connectToDatabase };
