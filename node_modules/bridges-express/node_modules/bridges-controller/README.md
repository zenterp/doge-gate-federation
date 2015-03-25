# Bridges Controller

The purpose is to easily load many controllers for the Bridges node.js server
application framework

## Installation

    npm install --save bridges-controller

## Usage

    var controllers = BridgesController.load({
      directory: './controllers',
      inject: [config]
    });

Then in the ./controllers directory each file must export a function which
receives the config object as a dependency

    // ./controllers/main.js
    module.exports = function(config) {
      // config is available in controller
      return {
        main: function(res, res, next) {
        }
      } 
    }

