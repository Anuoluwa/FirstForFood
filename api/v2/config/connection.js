import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE,
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.DATABASE_TEST,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

export default pool;
