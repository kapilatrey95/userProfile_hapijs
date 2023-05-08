export default {
  swagger: {
    options: {
      info: {
        title: 'API Documentation',
        version: 'v1.0.0',
      },
      schemes: ['http', 'https'],
      grouping: 'tags',
      sortEndpoints: 'ordered',
      securityDefinitions: {
        'jwt': {
          'type': 'apiKey',
          'name': 'Authorization',
          'in': 'header'
          // 'x-keyPrefix': 'Bearer '
        }
      },
      security: [{ jwt: [] }]
    },
  },
  status: {
    options: {
      path: '/status',
      title: 'API Monitor',
      routeConfig: {
        auth: false,
      },
    },
  },
};
