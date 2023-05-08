import Logger from './helper/logger';
import Server from './server';

(async () => {
  await Server.start();
})();

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', () => {
  Logger.info('Stopping server...');

  Server.stop().then(err => {
    Logger.info(`Server stopped`);
    process.exit(err ? 1 : 0);
  });
});

process.on('unhandledRejection', (promise, reason) => {
  Logger.info('Stopping server...', promise, reason);

  Server.stop().then(err => {
    Logger.info(`Server stopped`);
    process.exit(err ? 1 : 0);
  });
});
