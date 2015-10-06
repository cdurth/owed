var path      = require('path');
var rootPath  = path.normalize(__dirname + '/..');
var env       = process.env.NODE_ENV || 'development';
var fs        = require('fs');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
    secret: 'jwtsecret',
    database: 'mongodb://admin:admin@apollo.modulusmongo.net:27017/etEri8jo',
    https: {
      key: fs.readFileSync('./config/certificate/key.pem'),
      cert: fs.readFileSync('./config/certificate/cert.pem')
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'obscur_server'
    },
    port: 3000,
  }
};

module.exports = config[env];
