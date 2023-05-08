import { Server,  } from '@hapi/hapi';
import { validateToken } from './jwt';

const JWT_AUTH_SCHEME_NAME:string = 'jwt';

export const jwtAuthScheme:any = {
  name: JWT_AUTH_SCHEME_NAME,
  authenticate: async (request:any, h:any) => {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new Error('Missing authorization header');
    }
    const [scheme, token] = authorization.split(' ');
    if (scheme.toLowerCase() !== 'bearer') {
      throw new Error('Invalid authorization scheme');
    }
    try {
      const decoded = await request.server.app.jwt.verify(token);
      const credentials = await validateToken(decoded);
      return h.authenticated({ credentials });
    } catch (error) {
      throw new Error('Invalid token');
    }
  },
};

export function registerJwtAuthScheme(server: Server) {
//   server.auth.scheme(JWT_AUTH_SCHEME_NAME, jwtAuthScheme);
  server.auth.strategy('jwt', JWT_AUTH_SCHEME_NAME,jwtAuthScheme);
}
