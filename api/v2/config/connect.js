// import dotenv from 'dotenv';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE;
const pool = new Pool({
  connectionString,

});

export default pool;

// import pg from 'pg';
// import config from './config';

// const nodeEnv = process.env.NODE_ENV;
// let db;
// switch (nodeEnv) {
//   case 'production':
//     db = process.env.DATABASE_URL;
//     break;
//   case 'test':
//     db = config.test;
//     break;
//   default:
//     db = process.env.DATABASE;
// }
// console.log(nodeEnv);

// export default new pg.Pool(db);
