import path from 'path';
import ENV from './env';

console.log({ ENV });
const Config = {
    serverPort: ENV.SERVER_PORT || 5000,
    dbHost: ENV.DB_HOST || 'localhost',
    dbPassword: ENV.DB_PASSWORD || '',
    dbUser: ENV.DB_USER || 'root',
    dbPort: ENV.DB_PORT || '27017',
    dbName: ENV.DB_NAME || 'graphql-database'
};
Config.logFileDir = path.join(__dirname, '../../log');

export default Config;
