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
import * as bcrypt from 'bcrypt';
import {userProfileModel} from '../../../model/userProfile'; 

interface Payload {
  [key: string]: any;
}
export default class signUpController {
  public signUpUser = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
    try {
      const payload = request.payload as Payload;
      const {userName, password} = payload
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const data = await userProfileModel.create({"userName":payload["userName"],"hash":hash})
      const userResponse: any = generateSuccess("api working", { login  : "success" });
      return toolkit.response(
        newResponse({
          value: data,
        })
      );
    } catch (error) {
      Logger.error(`Error in src/api/users/login/controller.ts - Method: loginUser - ${error}`);
      return toolkit.response(
        newResponse({
          boom: Boom.badImplementation(error)
        })
      );
    }

  }

}