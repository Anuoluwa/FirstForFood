import express from 'express';
import expressApiVersioning from 'express-api-versioning';
import path from 'path';


const app = express();

app.use(expressApiVersioning({
  apiPath: path.join(__dirname, './api'),
  test: /\/api\/(v[0-9]+).*/,
  entryPoint: 'index.js',
  instance: app,
}, (error, req, res, next) => {
  if (error && error.code === 104) {
    res.status(200).send({ message: 'Welcome!' });
  }
  if (error && error.code !== 104) {
    res.status(500).send({ message: error.message });
  }
  next();
}));

export default app;
