'use strict';

const config = {
  /**
   * Development environment config
   */
  development: {
    http: {
      port: 3000
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook'
      },
      options: {
        useMongoClient: true
      },
      reconnectTimeoutMS: 32000
    }
  },
  /**
   * Production environment config
   */
  production: {
    http: {
      port: 80
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook'
      },
      options: {
        useMongoClient: true
      },
      reconnectTimeoutMS: 32000
    }
  },
  /**
   * Testing environment config
   */
  testing: {
    http: {
      port: 3030
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook-test'
      },
      options: {
        useMongoClient: true
      },
      reconnectTimeoutMS: 0
    }
  }
};

module.exports = env => config[env || 'development'];
