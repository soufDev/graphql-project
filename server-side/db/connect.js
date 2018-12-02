import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger';
import Config from '../core/config/config.dev';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    const { dbHost, dbName, dbPort } = Config;
  try {
    await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,
        { useNewUrlParser: true });
    logger.info('Connected to mongo!!!');
  } catch (err) {
    logger.error('Could not connect to MongoDB', err.message);
  }
};

export default connectToDb;
