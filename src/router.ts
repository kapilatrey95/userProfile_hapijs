import * as Hapi from '@hapi/hapi';
import UserRoutes from './api/users/routes';
import logger from './helper/logger';
import Logger from './helper/logger';
import UserLoginRoutes from './api/users/signIn/routes';
import UserSignInRoutes from "./api/users/signUp/routes"

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes');
    // try {
    //   const modules = [ UserSignInRoutes,UserLoginRoutes];

    //   for (const module of modules) {
    //     await module.register(server);

    //     // log the loaded routes
    //     server.table().forEach((route) => {
    //       console.log(`Route: ${route.method} ${route.path}`);
    //     });
    //   }
    // } catch (error) {
    //   throw error;
    // }
    await UserRoutes.loadRoutes(server);
    logger.info("Here");
    /* This is very important to add if you have 
      added some custom headers and you are facing
      CORS issue 
    */

    server.route([
      {
        method: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        path: "/{path*}",
        handler: (request, h) => {
          console.log(request);
          return h.response().header('Access-Control-Allow-Headers', 'Accept, Content-Type, User-Agent');
        }
      },
    ]);

    Logger.info('Router - Finish adding routes');
  }
}
