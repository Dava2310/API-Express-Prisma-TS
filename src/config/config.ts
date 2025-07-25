import { config } from 'dotenv';

config();

export const configuration = {
  app: {
    port: process.env.PORT || 5000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'ejemplo',
    port: process.env.MYSQL_PORT || 3306,
  },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
    refresh_secret: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    accessTokenExpiresIn: '2h',
    refreshTokenExpiresIn: '4h',
  },
};
