import {Sequelize} from 'sequelize-typescript';
import {User} from "../../users/user";
import {Product} from "../../products/product";
import {UserProductCount} from "../../userproductcounts/userProductCount";
import {Subproduct} from "../../products/subproduct";
import {CountPlan} from "../../countplans/countPlan";
import {CountPlanUser} from "../../countplans/countPlanUser";
import {CountExecution} from "../../countexecutions/countExecution";
import {Barcode} from "../../products/barcode";
const config = require("../config/config") // due to typescript transformation/compilation sequelize expects module.exports
const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

export const sequelize: Sequelize = new Sequelize({
  repositoryMode: true,
  dialect: envConfig.dialect,
  database: envConfig.database,
  host: envConfig.host,
  username: envConfig.username,
  password: envConfig.password,
  models: [User, Product, UserProductCount, Subproduct, CountPlan, CountPlanUser, CountExecution, Barcode]
});