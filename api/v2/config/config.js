import dotenv from 'dotenv';

dotenv.config();
const config = {
  development: {
    dev: process.env.DATABASE,
  },
  production: {
    prod: process.env.DATABASE_URL,
  },
  test: {
    test: process.env.DATABASE_TEST,
  },
};
export default config;
