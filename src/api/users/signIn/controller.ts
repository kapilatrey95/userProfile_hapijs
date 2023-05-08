import * as _ from 'lodash';
import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import newResponse from '../../../helper/response';
import Logger from '../../../helper/logger';
import validator from './validator';
import { generateError, generateSuccess } from '../../../helper/generateResponse';
import UserConfig from '../config';
import DB from "../../../instances/dbConnection"
import userProfile from '../../../model/userProfile';
import {userProfileModel} from '../../../model/userProfile'; 

import * as bcrypt from 'bcrypt'
import { error } from 'console';
import { resolve } from 'dns';
interface Payload {
  [key: string]: any;
}
export default class SignInController {
  public signInUser = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
    try {
      const payload = request.payload as Payload;
      const { userName, password } = payload;

      const data:any = await userProfileModel.findOne({where:{userName}});
      console.log(data)
      const storedHash = data.hash
      let flag = false
      await bcrypt.compare(password, storedHash, async (err, result) => {
        return new Promise( (resolve:any, reject:any)=>{
          if (err) {
            // Handle error
            reject()
           throw err
          } else if (result === true) {
            // Password is correct, log the user in
           resolve()
            
          } else {
            // Password is incorrect, display error message to user
            reject();
            return toolkit.response(
              newResponse({
                boom: Boom.badImplementation(err)
              })
            );
          }
        }
        
      )}) ;
      const userResponse: any = generateSuccess("api working", { login  : "success" });
      console.log(flag)
      if (flag){
        return toolkit.response(
          newResponse({
            value: userResponse,
          })
        );
      }else{
        return toolkit.response(
          newResponse({
            boom: Boom.badImplementation("user is not authenticated")
          })
        );
      }
      
    } catch (error) {
      Logger.error(`Error in src/api/users/signUp/controller.ts - Method: loginUser - ${error}`);
      return toolkit.response(
        newResponse({
          boom: Boom.badImplementation(error)
        })
      );
    }

  }

}