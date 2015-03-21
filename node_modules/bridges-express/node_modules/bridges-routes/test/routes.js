var path          = require('path');
var BridgesRoutes = require(path.join(__dirname, '/../'));
var express       = require('express');
var supertest     = require('supertest');
var app           = express();
var http          = supertest(app);
var assert        = require('assert');

describe('BridgesRoutes.draw', function() {
  it('should attach routes to an express app', function(done) {

    app.use('/', BridgesRoutes.draw({
      controllers : controllers,
      path        : path.join(__dirname, '/config/routes')
    }));

    http
      .get('/main')
      .end(function(error, response) {
        assert.strictEqual(response.statusCode, 200);
        assert(response.body.success);
        done();
      });
  });

  before(function() {
    controllers = {
      main: {
        index: function(req, res, next) {
          res.status(200).send({ success: true })
        }
      }   
    }
  });
});

/***** test/config/routes.js
module.exports = function(router, controllers) {

  router.get('/main', controllers.main.index);
}
*****/


