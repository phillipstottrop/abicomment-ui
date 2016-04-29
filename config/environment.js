/* jshint node: true */

module.exports = function(environment) {
  var ENV = {

    modulePrefix: 'abicomment-ui',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
     'default-src': "'none'",
     'script-src': "'self'",
     'font-src': "'self'",
     'connect-src': "'self' *",
     'img-src': "'self'",
     'style-src': "'self'",
     'media-src': "'self'"
   },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV['ember-simple-auth'] = {
    crossOriginWhitelist: ['*'],
    identificationAttributeName: 'email',
    tokenAttributeName: 'accessToken',
};
ENV['ember-simple-auth-token'] = {
  serverTokenEndpoint: 'http://localhost:3000/auth/sign_in',
  identificationField: 'email',
  passwordField: 'password',
  tokenPropertyName: 'access-token',
  authorizationPrefix: 'Bearer ',
  authorizationHeaderName: 'Authorization',
  headers:{}
};
  ENV.APP.API_HOST = 'http://localhost:3000';
        // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
  ENV['simple-auth-devise']={
      crossOriginWhitelist: ['http://localhost:3000'],
identificationAttributeName: 'email'
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:devise',
    crossOriginWhitelist: ['*']
  }


  return ENV;
};
