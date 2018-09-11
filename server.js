import dotenv from 'dotenv';
import express from 'express';
import App from './Versioning';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/', App);
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}!`);
});

export default app;
