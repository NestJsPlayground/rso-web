const envType = (process.env.NODE_ENV || 'dev') as 'dev' | 'prod' | 'stage' | 'test';
const appName = 'rso-apiseed';

export const environment = {
  appName,
  envType,

  deployVersion: process.env.DEPLOY_VERSION || 'unknown',

  consul: {
    host: process.env.CONSUL_HOST || `consul`
  },

  loggly: {
    token    : process.env.LOGZIO_TOKEN,
    subdomain: 'tilentomakic',
    tags     : ['Winston-NodeJS'],
    json     : true
  },

  mongo: process.env.MONGO_HOST
};

console.log('Used env', environment);
