import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index';
import swaggerDocument from '../../swagger.json';

export default (app) => {
  app.use(morgan('combined'));
  app.use(cors());
  app.use('api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/v2', routes);
};
