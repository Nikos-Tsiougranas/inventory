import {Dialect} from "sequelize";

interface Config {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "pass",
    database: process.env.DB_NAME || "inventory",
    host: process.env.DB_HOST || "localhost",
    dialect: 'mysql'
  }
};

module.exports = config
