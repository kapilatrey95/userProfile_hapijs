import * as Hapi from '@hapi/hapi';
import validator from './validator';
import SignInController from './controller';
import IRoute from '../../../helper/route';

interface HapiServerPlugin {
  name: string;
  register: (server: Hapi.Server, options?: any) => Promise<void>;
}
 class SignInRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>(resolve => {
      const controller = new SignInController();
      server.route([
        {
          method: 'POST',
          path: '/v1/users/signIn',
          options: {
            handler: controller.signInUser,
            validate: validator.userSignIn,
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
  name: 'signIn-plugin',
  register: async function (server: Hapi.Server, options: any) {
    const signInRoutes = new SignInRoutes();
    await signInRoutes.register(server);
  }
};
export default plugin;  