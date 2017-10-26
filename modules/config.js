const config = {
  /**
   * Development environment config
   */
  development: {
    http: {
      port: 3000,
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook',
      },
      options: {
        useMongoClient: true,
      },
      reconnectTimeoutMS: 32000,
    },
  },
  /**
   * Production environment config
   */
  production: {
    http: {
      port: 80,
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook',
      },
      options: {
        useMongoClient: true,
      },
      reconnectTimeoutMS: 32000,
    },
  },
  /**
   * Test environment config
   */
  test: {
    http: {
      port: 3030,
    },
    mongoose: {
      database: {
        host: 'localhost',
        name: 'hashbook-test',
      },
      options: {
        useMongoClient: true,
      },
      reconnectTimeoutMS: 0,
    },
  },
};

module.exports = (env = 'development') => config[env];
