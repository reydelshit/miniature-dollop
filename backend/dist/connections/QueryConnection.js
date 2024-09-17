"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = executeQuery;
const __1 = require("..");
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
function executeQuery(operation, query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, __1.connectToDatabase)();
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
                    result = yield request.query(query);
                    return result.recordset;
                case 'post':
                    result = yield request.query(query);
                    return result.rowsAffected;
                case 'put':
                case 'update':
                case 'delete':
                    result = yield request.query(query);
                    return result.rowsAffected;
                default:
                    throw new Error('Unsupported operation');
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            yield pool.close();
        }
    });
}
