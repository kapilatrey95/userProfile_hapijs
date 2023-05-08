import * as Hapi from '@hapi/hapi';
import * as Dotenv from 'dotenv';
import Logger from './../helper/logger';
import { Sequelize } from 'sequelize';
import userProfile from '../model/userProfile';
Dotenv.config();

export const connection = new Sequelize(`${process.env.DATABASE}`, "null", "null", {
  dialect: 'postgres',
  replication: {
    read: [
      { host: process.env.DBHOST, username: process.env.DBUSER, password: process.env.DBPWD },
    ],
    write: { host: process.env.DBHOST, username: process.env.DBUSER, password: process.env.DBPWD }
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export class CheckDbConnection {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      connection
        .authenticate()
        // .sync({ force: true })
        .then((data: any) => {
          Logger.info(`Connecting Database : Connection has been established successfully.`);
          resolve();
        })
        .catch((err: any) => {
          Logger.error(`Connecting Database : Unable to connect to the database: ${err}`);
          reject();
        });
    });
  }
}
let DB:any= {}
try{
  DB={
      UserProfile: userProfile(connection)
  }
} catch(error){
  console.log(error)
} 
connection.sync({ force: false });

export default DB