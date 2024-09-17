"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionConfig = void 0;
// export const connectionConfig = {
//   server: 'REYDELSHIT',
//   database: 'LIVEWELL',
//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true,
//   },
// driver: 'msnodesqlv8',
// };
exports.connectionConfig = {
    server: 'mssql-183603-0.cloudclusters.net',
    port: 10077,
    database: 'LIVEWELLCLOUD',
    user: 'admin',
    password: 'Admin123',
    options: {
        // trustedConnection: true,
        trustServerCertificate: true,
    },
};
