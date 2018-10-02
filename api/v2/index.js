import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index';
import swaggerDocument from '../../swagger.json';

export default (app) => {
  app.use(morgan('combined'));
  app.use('api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/v2', routes);
};
