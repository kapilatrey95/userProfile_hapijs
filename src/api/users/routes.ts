import * as Hapi from '@hapi/hapi';
import UserLoginRoutes from './signIn/routes';
import UserSignInRoutes from "./signUp/routes";
import ShowAllClients from './showAllClients/routes'

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    await  UserLoginRoutes.register(server);
    await  UserSignInRoutes.register(server);
    await  ShowAllClients.register(server)
  }


}
