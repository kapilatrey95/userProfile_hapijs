import * as Hapi from '@hapi/hapi';
import validator from './validator';
import SignUpController from './controller';
import IRoute from '../../../helper/route';

interface HapiServerPlugin {
  name: string;
  register: (server: Hapi.Server, options?: any) => Promise<void>;
}

 class SingUpRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>(resolve => {
      const controller = new SignUpController();
      server.route([
        {
          method: 'POST',
          path: '/v1/users/signup',
          options: {
            handler: controller.signUpUser,
            validate: validator.userSignUp,
            description: 'Method for user login - this is just a test route',
            tags: ['api', 'users'],
            auth: false,
          },
        }
      ]);
      resolve();
    });
  }

}


const plugin: HapiServerPlugin = {
  name: 'signUp-plugin',
  register: async function (server: Hapi.Server, options: any) {
    const signUpRoutes = new SingUpRoutes();
    await signUpRoutes.register(server);
  }
};
export default plugin;  