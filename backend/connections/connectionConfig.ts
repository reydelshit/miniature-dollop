export const connectionConfig = {
  server: 'REYDELSHIT',
  database: 'LIVEWELL',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: 'msnodesqlv8',
};

// export const connectionConfig = `Driver={SQL Server Native Client 11.0};Server=REYDELSHIT;Database=LIVEWELL;Trusted_Connection=yes;`;

// export const connectionConfig = {
//   server: 'mssql-183603-0.cloudclusters.net',
//   port: 10077,
//   database: 'LIVEWELLCLOUD',
//   user: 'admin',
//   password: 'Admin123',
//   options: {
//     // trustedConnection: true,
//     trustServerCertificate: true,
//   },
// };

// "scripts": {
//   "start": "nodemon src/index.ts",
//   "build": "rimraf dist && tsc",
//   "ts.check": "tsc --project tsconfig.json",
//   "add-build": "git add dist",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
