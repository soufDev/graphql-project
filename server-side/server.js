import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './core/logger/app-logger';
import config from './core/config/config.dev';
import bookRouter from './routes/book';
import authorRouter from './routes/author';
import connectToDb from './db/connect';

// graphql attempt
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID
    name: String
  }
  type Query {
      users: [User]
  }
`);
const root = { users: () => ([{ id: 1, name: 'John Doe' }, { id: 2, name: 'John Doe' }]) };

const port = config.serverPort;
logger.stream = {
  write(message, encoding) {
    logger.info(message);
    logger.info(encoding);
  }
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/api/v1', bookRouter);
app.use('/api/v1', authorRouter);

// graphql routes
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));
// Index route
app.get('/', (req, res) => {
  res.send({ message: 'hello Soufiane' });
});

app.listen(port, () => {
  logger.info('server started - ', port);
});
