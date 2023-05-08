import * as Hapi from '@hapi/hapi';
import validator from './validator';
import showAllClientsController from './controller';
import IRoute from '../../../helper/route';

interface HapiServerPlugin {
  name: string;
  register: (server: Hapi.Server, options?: any) => Promise<void>;
}

 class ShowAllClientsRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>(resolve => {
      const controller = new showAllClientsController();
      server.route([
        {
          method: 'POST',
          path: '/v1/users',
          options: {
            handler: controller.allUsers,
            validate: validator.users,
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
  name: 'users',
  register: async function (server: Hapi.Server, options: any) {
    const showAllClientsRoutes = new ShowAllClientsRoutes();
    await showAllClientsRoutes.register(server);
  }
};
export default plugin;  