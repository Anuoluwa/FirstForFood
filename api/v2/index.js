import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index';

export default (app) => {
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/v2', routes);
};
